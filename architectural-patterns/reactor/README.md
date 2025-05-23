# 🚦 Reactor Design Pattern

**Type**: Architectural Pattern  
**Also related to**: Event Loop, Asynchronous I/O, Non-blocking Servers  
**Commonly used in**: Node.js (via libuv), Nginx, Redis, Java NIO, browsers (conceptually)

---

## 🧠 What Is It?

The **Reactor pattern** is an architectural pattern for handling multiple concurrent I/O events **using a single-threaded event loop**.

Rather than blocking on operations (like file or socket reads), it **waits for I/O readiness** and **dispatches events** to handlers. Your app registers interest in events, and when they occur, the reactor "reacts".

> It separates **event demultiplexing** from **event handling**.

---

## 🧩 Main Components

| Component                | Role                                                        |
| ------------------------ | ----------------------------------------------------------- |
| **Reactor**              | The central loop that waits for events and dispatches them  |
| **Handlers**             | Callback functions that handle the events                   |
| **Event Demultiplexer**  | Waits for I/O readiness (e.g. `epoll`, `kqueue`, `select`)  |
| **Synchronous Dispatch** | Handler runs immediately in same thread when event is ready |

---

## ⚙️ How It Works

1. App registers handlers for events (e.g. "socket is readable").
2. Reactor enters a loop and waits on all events using `select`, `epoll`, etc.
3. When an event becomes **ready**, the Reactor invokes the corresponding handler.
4. Loop continues.

---

## ✅ When to Use

- You need high concurrency without many threads.
- You're building **non-blocking servers**, CLI tools, or network daemons.
- You want to avoid blocking I/O operations.

---

## 🔄 Reactor vs. Proactor

|                   | **Reactor**                 | **Proactor**                          |
| ----------------- | --------------------------- | ------------------------------------- |
| Who does I/O      | Your code handles I/O       | OS/library handles I/O                |
| When handler runs | When operation is **ready** | When operation is **completed**       |
| Common usage      | Node.js, Nginx, Redis       | Windows IOCP, .NET `async/await`, AIO |

---

## ✅ Advantages

- 🔥 Efficient: one thread can handle thousands of connections.
- ⚡ Fast: no blocking on I/O.
- 🧠 Easy to reason about for event-driven designs.

---

## ❌ Disadvantages

- 🧵 Still single-threaded: CPU-heavy work will block event loop.
- 🧩 Requires good design to handle complexity in deeply nested handlers.
- 🔁 Must integrate with async CPU offloading for scalability (e.g., thread pool).

---

## 🧵 Related Patterns

- **Observer**: Both dispatch events, but Reactor is for I/O, not state.
- **Proactor**: Similar goal, different execution model.
- **State Machine**: Often used together to handle protocols and transitions.
- **Event Loop**: Reactor is a concrete implementation of an event loop mechanism.

---

## 🧠 One-Line Hook

> "**Reactor** waits for readiness signals, then reacts by calling your handlers — no blocking, just reacting."

---
