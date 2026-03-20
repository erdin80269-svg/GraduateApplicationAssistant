// 用户类型
export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  phone?: string;
  university?: string;
  major?: string;
  gpa?: string;
  created_at: string;
  is_active: boolean;
}

// 学校类型
export interface School {
  id: number;
  name: string;
  level?: string;
  location?: string;
  website?: string;
  highlights: string[];
  created_at: string;
}

// 学校项目类型
export interface SchoolProgram {
  id: number;
  school_id: number;
  name: string;
  description?: string;
  requirements: string[];
  preferred_background: string[];
  material_order: string[];
  ps_style: string;
  ps_tone: string;
  school?: School;
  created_at: string;
}

// 材料类型
export interface Material {
  id: number;
  user_id: number;
  school_program_id?: number;
  material_type: string;
  title?: string;
  content?: string;
  word_count?: number;
  parameters?: Record<string, any>;
  file_path?: string;
  file_size?: number;
  status: string;
  error_message?: string;
  created_at: string;
  updated_at?: string;
}

// 材料生成请求类型
export interface MaterialGenerateRequest {
  resume_content: string;
  user_info: Record<string, any>;
  school_program_id: number;
  material_type: string;
  parameters: Record<string, any>;
}

// API响应类型
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
