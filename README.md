# @jordif/react-calendar-list

A lightweight, unstyled React component for rendering schedules or archives as a list of monthly calendars. Perfect for event feeds, blog archives and availability overviews.

---

## 🚀 Features

* **🪶 Lightweight:** Zero dependencies (other than React).
* **🎨 Unstyled:** Provides the logic and structure; you provide the CSS.
* **📅 Sequential Layout:** Renders months in a list.
* **🧩 Flexible:** Perfect for event feeds, availability overviews or blog archives.

## 📦 Installation

```bash
npm install @jordif/react-calendar-list
```

## ⚙️ Options

The component accepts the following props:

| Prop                | Type                       | Description                                                                   |
| :------------------ | :------------------------- | :---------------------------------------------------------------------------- |
| `posts`             | `Array<Post>` *(required)* | Array of objects to be rendered. Each object must include a `date`.           |
| `locale`            | `string` *(optional)*      | Determines the calendar language. Default: `en-US`.                           |
| `startOnMonday`     | `boolean` *(optional)*     | If `true`, the week will begin on Monday instead of Sunday. Default: `false`  |

## ⚙️ The 'Post' Object

The `posts` array should contain objects with the following structure:

| Key         | Type                | Description                                      |
| :---------- | :------------------ | :----------------------------------------------- |
| `date`      | `Date` *(required)*   | The date of the post.                |
| `url`       | `string` *(optional)* | The link the post points to.         |
| `className` | `string` *(optional)* | A CSS class name for custom styling. |

## Usage Example

### 1. Import the component
First, import the calendar into your React file:

```jsx
import { CalendarList } from "@jordif/react-calendar-list/CalendarList";
```

### 2. Define your data
Prepare the list of items (posts or events) that you want to display:

```jsx
type Post = {
  date: Date;
  url?: string;
  className?: string;
};

const posts: Post[] = [
  {
    date: new Date(2025, 11, 17),
    url: "https://web.dev/blog/lcp-and-inp-are-now-baseline-newly-available",
    className: "cwv",
  },
  {
    date: new Date(2025, 11, 16),
    url: "https://web.dev/blog/web-platform-12-2025",
    className: "css",
  },
  {
    date: new Date(2025, 11, 11),
    url: "https://web.dev/blog/upvote-features",
    className: "baseline",
  },
];
```

### 3. Render the component
Pass the list of posts to the component in your JSX:

```jsx
<CalendarList posts={posts} />
```
