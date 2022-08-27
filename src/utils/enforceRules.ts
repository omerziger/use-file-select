import { FACTORY_RULE_KEYS } from "../constants"
import { CustomRule, FactoryRule, Rule, UFSCustomError, UFSError, UFSFile } from "../types"

export async function enforceRules(rules: Rule[], file: UFSFile): Promise<Array<UFSError | UFSCustomError>> {
    const factoryRules: FactoryRule[] = []
    const customRules: CustomRule[] = []

    rules.forEach(rule => {
        if (FACTORY_RULE_KEYS.includes(rule.key)) factoryRules.push(rule as FactoryRule)
        else customRules.push(rule as CustomRule)
    })

    const factoryRuleErrors = enforceFactoryRules(factoryRules, file)
    const customRuleErrors = await enforceCustomRules(customRules, file)

    return [...factoryRuleErrors, ...customRuleErrors]
}

const enforceFactoryRules = (rules: FactoryRule[], file: UFSFile): UFSError[] => {
    const errors: UFSError[] = []

    rules.forEach(rule => {
        if (rule.key === 'size') {
            const fileSize = file.file.size
            if (rule.min && rule.min > fileSize) errors.push('size')
            if (rule.max && rule.max < fileSize && !errors.includes('size')) errors.push('size')
        }
        if (rule.key === 'format') {
            const fileFormat = file.file.type.split('/')[1]
            if (!rule.formats.includes(fileFormat)) errors.push('format')
        }
        if (rule.key === 'duration' && file.audioBuffer) {
            const fileDuration = file.audioBuffer.duration
            if (rule.min && rule.min > fileDuration) errors.push('duration')
            if (rule.max && rule.max < fileDuration && !errors.includes('duration')) errors.push('duration')
        }
    })

    return errors
}

const enforceCustomRules = async (rules: CustomRule[], file: UFSFile): Promise<UFSCustomError[]> => {
    const errors: UFSCustomError[] = []

    rules.forEach(async rule => {
        const { key, validator } = rule
        const isValid = await validator(file)
        if (!isValid && !errors.includes(key)) errors.push(key)
    })

    return errors
}
