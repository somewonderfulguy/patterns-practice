# Singleton Design Pattern

**Type**: Creational Pattern

**Intent**: Lets you ensure that a class has only one instance, while providing a global access point to this instance.

Use the Singleton pattern when a class in your program should have just a single instance available to all clients; for example, a single database object shared by different parts of the program.

Use the Singleton pattern when you need stricter control over global variables.

**Pros**:

- You can be sure that a class has only a single instance.
- You gain a global access point to that instance.
- The singleton object is initialized only when it’s requested for the first time.

**Cons**:

- Violates the Single Responsibility Principle. The pattern solves two problems at the time (1 - ensure that a class has a single instance; 2 - provide global access point to that instance).
- (JS only, TS unlikely) Identifying Singletons can be difficult. If you’re importing a large module, you will be unable to recognize that a particular class is a Singleton. As a result, you may accidentally use it as a regular class to instantiate multiple objects and incorrectly update it instead.
- Challenging to test. Singletons can be more difficult to test due to issues ranging from hidden dependencies, difficulty creating multiple instances, difficulty in stubbing dependencies, and so on.
- Need for careful orchestration. An everyday use case for Singletons would be to store data that will be required across the global scope, such as user credentials or cookie data that can be set once and consumed by multiple components. Implementing the correct execution order becomes essential so that data is always consumed after it becomes available and not the other way around. This may become challenging as the application grows in size and complexity.

## Relations with Other Patterns

- A **Facade** class can often be transformed into a **Singleton** since a single facade object is sufficient in most cases.
- **Flyweight** would resemble **Singleton** if you somehow managed to reduce all shared states of the objects to just one flyweight object. But there are two fundamental differences between these patterns:
  1. There should be only one Singleton instance, whereas a Flyweight class can have multiple instances with different intrinsic states.
  1. The Singleton object can be mutable. Flyweight objects are immutable.
- **Abstract Factories**, **Builders** and **Prototypes** can all be implemented as **Singletons**.

## State Management in React

Developers using React for web development can rely on the global state through state management tools such as Redux or React Context instead of Singletons. Unlike Singletons, these tools provide a read-only state rather than the mutable state. Although the downsides to having a global state don’t magically disappear by using these tools, we can at least ensure that the global state is mutated the way we intend it to because components cannot update it directly.

Osmani, Addy. Learning JavaScript Design Patterns.

---

React's component-based architecture and state management tools (like useState, useReducer, Context API) often make Singletons less necessary. React already provides mechanisms to manage and share state effectively.

Overuse of Singletons can make your application harder to test and debug. It can also lead to tighter coupling and less modular code.

In server-side rendering (SSR) with React, Singletons can lead to unintended side effects if they hold state, as the same instance might be shared across different requests.

## Comments

Singleton is kind of Redux store. Global object, single source of truth. Imagine you create Settings "store" as Singleton class - you can access it from any place in your app and change settings.
