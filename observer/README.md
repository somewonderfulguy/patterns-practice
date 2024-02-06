# Observer Design Pattern

_Also known as: Publish-Subscribe (PubSub), Event-Subscriber, Listener_

**Type**: Behavioral Pattern

**Observer** is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.

Use the Observer pattern when changes to the state of one object may require changing other objects, and the actual set of objects is unknown beforehand or changes dynamically.

The object that has some interesting state is often called the **subject**, but it’s also known as the **publisher** or the **observable**. All other objects that want to track changes to the subject’s state are called **observers**, **subscribers**, or **listeners**.

## Mediator vs. Observer

The **Mediator** pattern focuses on providing a centralized communication interface for a set of objects. These objects don’t know about each other, but they’re aware of the mediator object. The **Observer** pattern establishes direct communication between senders (subjects) and receivers (observers).

The primary goal of the **Mediator** is to eliminate mutual dependencies among a set of system components. Instead, these components become dependent on a single mediator object. The goal of **Observer** is to establish dynamic one-way connections between objects, where some objects act as subordinates of others.

**Pros**:

- Open/Closed Principle. You can introduce new subscriber classes without having to change the publisher’s code (and vice versa if the publisher is a subscriber).

**Cons**:

- Subscribers are notified in random order.

## Relations with Other Patterns

- **Chain of Responsibility**, **Command**, **Mediator** and **Observer** address various ways of connecting senders and receivers of requests:
  - **Chain of Responsibility** passes a request sequentially along a dynamic chain of potential receivers until one of them handles it.
  - **Command** establishes unidirectional connections between senders and receivers.
  - **Mediator** eliminates direct connections between senders and receivers, forcing them to communicate indirectly via a mediator object.
  - **Observer** lets receivers dynamically subscribe to and unsubscribe from receiving requests.
- The difference between **Observer** and **Mediator** is often elusive. In most cases, you can implement either of these patterns; but sometimes you can apply both simultaneously.
