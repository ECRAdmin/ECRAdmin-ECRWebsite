import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import {
  getPublicCompanyInfo,
  getPublicContactChannels,
  getPublicFaq,
  getPublicFleet,
  getPublicOffers,
  getPublicRequirements,
  getPublicServiceAreas,
  getPublicStartingPrices,
  getPublicVehicleDetails,
} from "@/lib/public-data";
import type { Locale } from "@/lib/locale";

export const runtime = "nodejs";

const ipWindow = new Map<string, { count: number; resetAt: number }>();
const LOCALE_SCHEMA = z.enum(["ar", "en"]).default("en");

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = ipWindow.get(ip);

  if (!current || current.resetAt < now) {
    ipWindow.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  current.count += 1;
  return current.count > 120;
}

function withMcpHeaders(response: Response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, mcp-session-id, mcp-protocol-version, Last-Event-ID",
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS, GET, DELETE",
  );
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function formatToolResult(data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function createServer() {
  const server = new McpServer(
    {
      name: "eagle-car-rental-public",
      version: "1.0.0",
    },
    {
      capabilities: {
        logging: {},
      },
      instructions:
        "This is a public, read-only MCP server for Eagle Car Rental. It exposes only public marketing and informational data and never returns private rates, live availability, contracts, or customer data.",
    },
  );

  server.registerTool(
    "company_info",
    {
      description: "Return public company profile and contact details.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) => formatToolResult(getPublicCompanyInfo(locale as Locale)),
  );

  server.registerTool(
    "service_areas",
    {
      description: "Return public UAE service areas.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) => formatToolResult(getPublicServiceAreas(locale as Locale)),
  );

  server.registerTool(
    "public_fleet",
    {
      description: "Return public fleet cards and pricing bands.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) => formatToolResult(await getPublicFleet(locale as Locale)),
  );

  server.registerTool(
    "vehicle_details",
    {
      description: "Return public vehicle details by slug.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
        slug: z.string().min(2),
      },
    },
    async ({ locale, slug }) =>
      formatToolResult(
        getPublicVehicleDetails(locale as Locale, slug) ?? {
          error: "Vehicle not found",
        },
      ),
  );

  server.registerTool(
    "starting_prices",
    {
      description: "Return public starting prices for all listed vehicles.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) =>
      formatToolResult(getPublicStartingPrices(locale as Locale)),
  );

  server.registerTool(
    "rental_requirements",
    {
      description: "Return public requirements for residents and tourists.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) =>
      formatToolResult(getPublicRequirements(locale as Locale)),
  );

  server.registerTool(
    "faq",
    {
      description: "Return public FAQ entries.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) => formatToolResult(getPublicFaq(locale as Locale)),
  );

  server.registerTool(
    "contact_channels",
    {
      description: "Return public phone, WhatsApp, and email contact channels.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) =>
      formatToolResult(getPublicContactChannels(locale as Locale)),
  );

  server.registerTool(
    "offers",
    {
      description: "Return public promotional groupings and offer summaries.",
      inputSchema: {
        locale: LOCALE_SCHEMA,
      },
    },
    async ({ locale }) => formatToolResult(getPublicOffers(locale as Locale)),
  );

  server.registerResource(
    "company-info",
    "eagle://company-info",
    { mimeType: "application/json" },
    async () => ({
      contents: [
        {
          uri: "eagle://company-info",
          mimeType: "application/json",
          text: JSON.stringify(getPublicCompanyInfo("en"), null, 2),
        },
      ],
    }),
  );

  server.registerResource(
    "service-areas",
    "eagle://service-areas",
    { mimeType: "application/json" },
    async () => ({
      contents: [
        {
          uri: "eagle://service-areas",
          mimeType: "application/json",
          text: JSON.stringify(getPublicServiceAreas("en"), null, 2),
        },
      ],
    }),
  );

  server.registerResource(
    "public-fleet",
    "eagle://public-fleet",
    { mimeType: "application/json" },
    async () => ({
      contents: [
        {
          uri: "eagle://public-fleet",
          mimeType: "application/json",
          text: JSON.stringify(getPublicFleet("en"), null, 2),
        },
      ],
    }),
  );

  server.registerResource(
    "public-offers",
    "eagle://offers",
    { mimeType: "application/json" },
    async () => ({
      contents: [
        {
          uri: "eagle://offers",
          mimeType: "application/json",
          text: JSON.stringify(getPublicOffers("en"), null, 2),
        },
      ],
    }),
  );

  return server;
}

function methodNotAllowed() {
  return withMcpHeaders(
    Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed.",
        },
        id: null,
      },
      { status: 405 },
    ),
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return withMcpHeaders(
      Response.json(
        {
          jsonrpc: "2.0",
          error: {
            code: -32001,
            message: "Rate limit exceeded.",
          },
          id: null,
        },
        { status: 429 },
      ),
    );
  }

  const transport = new WebStandardStreamableHTTPServerTransport();
  const server = createServer();
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  return withMcpHeaders(response);
}

export async function OPTIONS() {
  return withMcpHeaders(new Response(null, { status: 204 }));
}

export async function GET() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}
