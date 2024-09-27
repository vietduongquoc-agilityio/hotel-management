import React from "react";

export default function TextAreaApp() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }

    return (
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Post title: <input name="postTitle" defaultValue="Biking" />
        </label>
        <label>
          Edit your post:
          <textarea
            name="postContent"
            defaultValue="I really enjoyed biking yesterday!"
            rows={2}
            cols={50}
          />
        </label>
        <hr />
        <button type="reset">Reset edits</button>
        <button type="submit">Save post</button>
      </form>
    );
  }


