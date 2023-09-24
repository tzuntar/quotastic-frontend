import {QuoteType} from "../../models/quote";

export interface CreateUpdateQuoteFields {
    body: string;
}

interface Props {
    defaultValues?: QuoteType;
}
