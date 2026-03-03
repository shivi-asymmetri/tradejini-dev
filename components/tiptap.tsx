// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Table from "@tiptap/extension-table";
// import Link from "@tiptap/extension-link";
// import CodeBlock from "@tiptap/extension-code-block";
// import Underline from "@tiptap/extension-underline";
// import Highlight from "@tiptap/extension-highlight";
// import Mention from "@tiptap/extension-mention";
// import TaskList from "@tiptap/extension-task-list";
// import TextAlign from "@tiptap/extension-text-align";
// import Heading from "@tiptap/extension-heading";
// import FontSize from "@tiptap/extension-font-size";
// import Placeholder from "@tiptap/extension-placeholder";
// import { storage, ref, uploadBytes, getDownloadURL } from "./firebase";
// import { useState } from "react";
// import { HTML } from "@tiptap/extension-html";
// import Markdown from "@tiptap/extension-markdown";
// import Emoji from "@tiptap/extension-emoji";

// const MyEditor = () => {
//   const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState("<p>Start writing here...</p>");

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Image,
//       Table,
//       Link,
//       CodeBlock,
//       Underline,
//       Highlight,
//       Mention,
//       TaskList,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       Heading.configure({ levels: [1, 2, 3] }),
//       FontSize.configure({ defaultSize: "16px" }),
//       Placeholder.configure({ placeholder: "Start writing here..." }),
//       HTML,
//       Markdown,
//       Emoji.configure(),
//     ],
//     content: "<p>Start writing here...</p>",
//     onUpdate: ({ editor }) => {
//       setPreview(editor.getHTML());
//     },
//   });

//   if (!editor) {
//     return null;
//   }

//   const uploadImage = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const storageRef = ref(storage, `images/${file.name}`);
//     await uploadBytes(storageRef, file);
//     const url = await getDownloadURL(storageRef);
//     editor.chain().focus().setImage({ src: url }).run();
//     setUploading(false);
//   };

//   const insertHTML = () => {
//     const htmlContent = prompt("Enter your HTML code:");
//     if (htmlContent) {
//       editor.commands.insertContent(htmlContent);
//     }
//   };

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       {/* Editor Section */}
//       <div style={{ width: "50%" }}>
//         <div>
//           <button onClick={() => editor.chain().focus().toggleBold().run()}>
//             Bold
//           </button>
//           <button onClick={() => editor.chain().focus().toggleItalic().run()}>
//             Italic
//           </button>
//           <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
//             Underline
//           </button>
//           <button onClick={() => editor.chain().focus().toggleStrike().run()}>
//             Strikethrough
//           </button>
//           <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
//             Code Block
//           </button>
//           <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
//             Align Left
//           </button>
//           <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
//             Align Center
//           </button>
//           <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
//             Align Right
//           </button>
//           <button onClick={insertHTML}>Insert HTML</button>
//         </div>
//         <div>
//           <input type="file" accept="image/*" onChange={uploadImage} />
//           {uploading && <p>Uploading...</p>}
//         </div>
//         <EditorContent editor={editor} />
//       </div>

//       {/* Live Preview Section */}
//       <div style={{ width: "50%", border: "1px solid gray", padding: "10px" }}>
//         <h3>Live Preview</h3>
//         <div dangerouslySetInnerHTML={{ __html: preview }} />
//       </div>
//     </div>
//   );
// };

// export default MyEditor;
