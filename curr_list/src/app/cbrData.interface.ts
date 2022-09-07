export interface cbrData {
    Date: string,
    PreviousDate: string
    PreviousUrl: string,
    Timestamp: string,
    Valute: CbrValuteParams
}

export interface CbrValuteParams{
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: Number,
    Name: string,
    Value: Number,
    Previous: Number
}