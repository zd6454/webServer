declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    adminName?: string;
    phone?: string;
    department?: string;
    role?:string;
    signature?: string;
    adminId?: string;
    isAllowLogin?: number;
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
