"use client";

import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
} from "lucide-react";

type MarkdownTextareaProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function MarkdownTextarea({
  id,
  value,
  onChange,
  placeholder,
  className,
}: MarkdownTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const wrapSelection = (before: string, after: string = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const hasSelection = selectionStart !== selectionEnd;
    const selected = value.slice(selectionStart, selectionEnd);
    const newValue =
      value.slice(0, selectionStart) +
      before +
      (hasSelection ? selected : "") +
      after +
      value.slice(selectionEnd);

    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursorPos = selectionStart + before.length + (hasSelection ? selected.length : 0);
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  };

  const applyList = (ordered: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd } = textarea;
    const beforeText = value.slice(0, selectionStart);
    const selectedText = value.slice(selectionStart, selectionEnd) || "List item";
    const afterText = value.slice(selectionEnd);

    const lines = selectedText.split(/\r?\n/);
    const formatted = lines
      .map((line, idx) => (ordered ? `${idx + 1}. ` : "- ") + (line.trim() || "Item"))
      .join("\n");

    const newValue = beforeText + formatted + afterText;
    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const start = beforeText.length;
      const end = start + formatted.length;
      textarea.setSelectionRange(start, end);
    });
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => wrapSelection("**", "**")}
                title="Bold"
                aria-label="Bold"
              >
                <BoldIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => wrapSelection("*", "*")}
                title="Italic"
                aria-label="Italic"
              >
                <ItalicIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="mx-1 h-5 w-px bg-gray-200" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => applyList(false)}
                title="Bulleted list"
                aria-label="Bulleted list"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bulleted list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => applyList(true)}
                title="Numbered list"
                aria-label="Numbered list"
              >
                <ListOrderedIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Numbered list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        id={id}
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          const textarea = textareaRef.current;
          if (!textarea) return;

          const selectionStart = textarea.selectionStart ?? 0;
          const selectionEnd = textarea.selectionEnd ?? 0;

          // Shift+Enter: hard line break inside current paragraph/item
          if (e.shiftKey) {
            e.preventDefault();
            const insert = "  \n"; // Markdown hard break
            const newValue = value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
            const newPos = selectionStart + insert.length;
            onChange(newValue);
            requestAnimationFrame(() => {
              textarea.focus();
              textarea.setSelectionRange(newPos, newPos);
            });
            return;
          }

          // Determine current line bounds
          const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
          const lineEndIdx = value.indexOf("\n", selectionStart);
          const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
          const line = value.slice(lineStart, lineEnd);

          // Match bullets or ordered lists with optional indent
          const bulletMatch = line.match(/^(\s*)([-*+])\s+(.*)$/);
          const orderedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);

          if (!bulletMatch && !orderedMatch) return; // let default for non-list lines

          e.preventDefault();

          if (bulletMatch) {
            const [, indent, marker, rest] = bulletMatch;
            const caretAtLineEnd = selectionStart === lineEnd && selectionStart === selectionEnd;
            const isEmptyItem = rest.trim().length === 0 && caretAtLineEnd;
            if (isEmptyItem) {
              // Exit list: remove marker and create blank line
              const newValue = value.slice(0, lineStart) + "\n" + value.slice(lineEnd);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                const pos = lineStart + 1;
                textarea.setSelectionRange(pos, pos);
              });
              return;
            }

            const insert = "\n" + indent + marker + " ";
            const newValue = value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
            const newPos = selectionStart + insert.length;
            onChange(newValue);
            requestAnimationFrame(() => {
              textarea.focus();
              textarea.setSelectionRange(newPos, newPos);
            });
            return;
          }

          if (orderedMatch) {
            const [, indent, numStr, rest] = orderedMatch;
            const caretAtLineEnd = selectionStart === lineEnd && selectionStart === selectionEnd;
            const isEmptyItem = rest.trim().length === 0 && caretAtLineEnd;
            if (isEmptyItem) {
              const newValue = value.slice(0, lineStart) + "\n" + value.slice(lineEnd);
              onChange(newValue);
              requestAnimationFrame(() => {
                textarea.focus();
                const pos = lineStart + 1;
                textarea.setSelectionRange(pos, pos);
              });
              return;
            }

            const nextNum = parseInt(numStr, 10) + 1;
            const insert = "\n" + indent + nextNum + ". ";
            const newValue = value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
            const newPos = selectionStart + insert.length;
            onChange(newValue);
            requestAnimationFrame(() => {
              textarea.focus();
              textarea.setSelectionRange(newPos, newPos);
            });
          }
        }}
        placeholder={placeholder}
        className={className ?? "min-h-[120px]"}
      />
      <p className="mt-1 text-xs text-gray-500">
        Supports Markdown: bold, italic, and lists. Enter continues a list; Enter on an empty list item exits; Shift+Enter inserts a line break.
      </p>
    </div>
  );
}


