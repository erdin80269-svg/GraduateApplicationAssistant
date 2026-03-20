// API客户端配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 通用API请求函数
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // 如果有token，添加到headers
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

// 用户相关API
export const userApi = {
  // 注册
  register: (data: { username: string; email: string; password: string }) =>
    apiRequest('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 登录
  login: (data: { username: string; password: string }) =>
    apiRequest('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 获取当前用户信息
  getCurrentUser: () => apiRequest('/api/users/me'),

  // 更新用户信息
  updateUser: (data: {
    name?: string;
    phone?: string;
    university?: string;
    major?: string;
    gpa?: string;
  }) =>
    apiRequest('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// 学校相关API
export const schoolApi = {
  // 获取学校列表
  getSchools: (params?: { level?: string; location?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.level) queryParams.append('level', params.level);
    if (params?.location) queryParams.append('location', params.location);

    return apiRequest(`/api/schools${queryParams.toString() ? `?${queryParams}` : ''}`);
  },

  // 获取学校详情
  getSchool: (schoolId: number) =>
    apiRequest(`/api/schools/${schoolId}`),

  // 获取学校项目列表
  getSchoolPrograms: (schoolId: number) =>
    apiRequest(`/api/schools/${schoolId}/programs`),

  // 获取项目详情
  getProgram: (programId: number) =>
    apiRequest(`/api/schools/programs/${programId}`),
};

// 材料相关API
export const materialApi = {
  // 生成材料
  generateMaterial: (data: {
    resume_content: string;
    user_info: Record<string, any>;
    school_program_id: number;
    material_type: string;
    parameters: Record<string, any>;
  }) =>
    apiRequest('/api/materials/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 获取材料列表
  getMaterials: (params?: { user_id?: number; material_type?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.user_id) queryParams.append('user_id', String(params.user_id));
    if (params?.material_type) queryParams.append('material_type', params.material_type);

    return apiRequest(`/api/materials${queryParams.toString() ? `?${queryParams}` : ''}`);
  },

  // 获取材料详情
  getMaterial: (materialId: number) =>
    apiRequest(`/api/materials/${materialId}`),
};
