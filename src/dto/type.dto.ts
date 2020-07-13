export interface Validate {
  status: boolean;
  infos: Array<Infos>;
}

export interface Infos {
  key?: string;
  val?: any;
  message: string;
}

export interface ValidRule {
  status: boolean;
  message: string;
  key?: string;
}

// export const rules = ['required', 'len', 'min', 'max', 'enum', 'type', 'pattern', 'validator']
export interface Rule {
  message: string;
  required?: boolean;
  len?: number;
  min?: number;
  max?: number;
  enum?: Array<any>;
  type?: string;
  pattern?: string;
  validator?: any;
}
