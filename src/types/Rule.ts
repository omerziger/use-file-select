export type Rule = {
    key: 'formats' | 'length' | 'size'
    formats?: string[]
    min?: number
    max?: number
}