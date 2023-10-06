import React from "react";
import * as API from '../../api/Api';
import CreateQuoteModal from "../quote/CreateQuoteModal";
import {CreateUpdateQuoteFields} from "../../hooks/react-hook-form/useCreateUpdateQuote";
import {StatusCode} from "../../constants/statusCodeConstants";
import {ModalActions} from "../../constants/modalActionConstants";

interface Props {
    shownModal?: string,
}

/**
 * Handles displaying and managing all modules, available to signed-in users.
 */
const Modals: React.FC<Props> = ({shownModal}) => {

    const handleQuoteCreation = async (quoteData: CreateUpdateQuoteFields) => {
        const result = await API.createQuote(quoteData);
        if (result.status !== StatusCode.OK && result.status !== StatusCode.CREATED)
            alert('Posting the quote failed');  // ToDo: better UI for this
    };

    return (
        <CreateQuoteModal isShown={shownModal === ModalActions.CREATE_QUOTE}
                          onCreate={handleQuoteCreation}/>
    )
};

export default Modals;