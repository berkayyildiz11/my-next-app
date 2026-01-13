import { Server, Socket } from "socket.io";

// --- 1. Define Strict Types ---

// Data shape for the stock update
interface StockUpdate {
  symbol: string;
  price: number;
  change: number;
  timestamp: number;
}

// Events the client (Frontend) can send
interface ClientToServerEvents {
  subscribe: (symbol: string) => void;
  unsubscribe: (symbol: string) => void;
}

// Events the server (Backend) can send
interface ServerToClientEvents {
  "stock-update": (data: StockUpdate) => void;
}

// --- 2. Initialize Standalone Server ---

const PORT = 4000;

const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
  cors: {
    origin: "*", // Allow all origins (configure this for production)
  },
});

console.log(`🚀 Stock Tracker WebSocket Server running on port ${PORT}`);

// --- 3. Handle Connections ---

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
