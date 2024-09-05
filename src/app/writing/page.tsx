"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInfo } from "@/context/InfoContext";
import { useWritingForm } from "@/context/WritingContext";
import { LucideSend } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Page() {
  const [tab, setTab] = useState("chat");

  return (
    <Tabs
      defaultValue={tab}
      className="flex flex-col h-full overflow-hidden text-center w-full bg-white items-center"
    >
      <div className="py-2">
        <TabsList className="w-fit">
          <TabsTrigger value="chat" onClick={() => setTab("chat")}>
            Chat
          </TabsTrigger>
          <TabsTrigger value="source" onClick={() => setTab("source")}>
            Source
          </TabsTrigger>
        </TabsList>
      </div>
      {tab === "chat" && <ChatContent />}
      {tab === "source" && <SourceContent />}
    </Tabs>
  );
}

const SourceContent = () => {
  const { sourceContent, setSourceContent } = useWritingForm();

  return (
    <TabsContent
      value="source"
      className="mt-0 h-full w-full overflow-hidden flex flex-col container mx-auto"
    >
      <p className="text-2xl font-bold text-gray-800 text-left h-fit w-full ">
        Source Content
      </p>
      <Textarea
        className="mt-5 w-full h-full px-6 py-3"
        placeholder="Enter your content here"
        value={sourceContent}
        onChange={(e) => setSourceContent(e.target.value)}
      />
      <div className="px-6 py-3 flex gap-3 items-center justify-end">
        <Button variant={"ghost"}>Clear</Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Save
        </Button>
      </div>
    </TabsContent>
  );
};

const ChatContent = () => {
  const { message, setMessage, chat, sendMessage } = useWritingForm();

  return (
    <TabsContent
      value="chat"
      className="flex flex-col h-full w-full overflow-auto mt-0"
    >
      <div className="h-full container mx-auto">
        <p className="text-2xl font-bold text-gray-800 w-full text-left mb-4">
          Chat
        </p>
        {chat.map((message: any, index: number) => (
          <div key={index} className="flex flex-col mt-4">
            <p className="text-gray-800 font-semibold">{message.user}</p>
            <p className="text-gray-600">{message.text}</p>
          </div>
        ))}
      </div>

      {/* Message Box */}
      <div className="py-3 container mx-auto">
        <div className="flex items-center border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-600">
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            className="w-full p-3 resize-none border-none focus:outline-none"
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="pr-2">
            <Button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              size={"sm"}
              onClick={sendMessage}
            >
              <LucideSend size={16} />
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
