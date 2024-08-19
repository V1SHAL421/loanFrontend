import { User } from "./user.interface"

export interface Loan {
    amount: number
    loanPeriod: number
    user: User
}