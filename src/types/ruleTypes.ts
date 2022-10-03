import { UFSFile } from "./fileTypes"

export interface FormatsRule { key: 'format', formats: string[] }
export interface DurationRule { key: 'duration', min?: number, max?: number }
export interface SizeRule { key: 'size', min?: number, max?: number }
export interface CustomRule { key: string, validator: CustomRuleValidator }
export type FactoryRule = FormatsRule | DurationRule | SizeRule
export type Rule = FactoryRule | CustomRule

export type CustomRuleValidator = (file: UFSFile) => Promise<Boolean>