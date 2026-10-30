export type MemoLabel =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";
export type Category = "업무" | "개인" | "아이디어";

// 글 안에서 굵게 보일 부분은 { bold } 로 적는다.
export type Inline = string | { bold: string };

export type Block =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; content: Inline[] }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  label: MemoLabel;
  category: Category;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  body: Block[];
};
