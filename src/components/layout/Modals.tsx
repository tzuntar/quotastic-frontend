import React from "react";
import * as API from '../../api/Api';
import CreateQuoteModal from "../quote/CreateQuoteModal";
import {CreateUpdateQuoteFields} from "../../hooks/react-hook-form/useCreateUpdateQuote";
import {StatusCode} from "../../constants/statusCodeConstants";
import {ModalActions} from "../../constants/modalActionConstants";

interface Props {
    shownModal?: string,
    onModalClose: () => void,
}

/**
 * Handles displaying and managing all modal dialog boxes, available to
 * signed-in users.
 */
const Modals: React.FC<Props> = ({shownModal, onModalClose}) => {

    const handleQuoteCreation = async (quoteData: CreateUpdateQuoteFields) => {
        const result = await API.createQuote(quoteData);
        if (result.status !== StatusCode.OK && result.status !== StatusCode.CREATED)
            alert('Posting the quote failed');  // ToDo: better UI for this
    };

    return (
        shownModal === ModalActions.CREATE_QUOTE &&
        <CreateQuoteModal onCreate={handleQuoteCreation}
                          onCancel={() => onModalClose()}/>
    )
};

export default Modals;