"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CloseIcon } from "@/components/icons";

interface TagInputProps {
  name: string;
  label: string;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({ name, label, placeholder = "Add a tag...", maxTags = 5 }: TagInputProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [inputValue, setInputValue] = useState("");
  const tags: string[] = watch(name) || [];
  const error = errors[name]?.message as string | undefined;

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      setValue(name, [...tags, trimmed]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(name, tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-foreground/60 mb-1.5">{label}</label>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-primary/50 hover:text-primary cursor-pointer"
              >
                <CloseIcon size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length >= maxTags ? `Max ${maxTags} tags` : placeholder}
          disabled={tags.length >= maxTags}
          className="flex-1 manga-outline bg-white px-4 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)] disabled:opacity-50"
        />
        <button
          type="button"
          onClick={addTag}
          disabled={!inputValue.trim() || tags.length >= maxTags}
          className="manga-outline-sm bg-muted px-4 py-2 text-sm font-bold text-foreground/60 hover:bg-muted/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add
        </button>
      </div>
      
      <p className="mt-1 text-[10px] text-foreground/40">{tags.length}/{maxTags} tags</p>
      
      {error && (
        <p className="mt-1 text-xs font-bold text-red-500">{error}</p>
      )}
    </div>
  );
}
