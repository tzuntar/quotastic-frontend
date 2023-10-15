import React from "react";
import * as API from '../../api/Api';
import CreateQuoteModal from "../quote/CreateQuoteModal";
import {CreateUpdateQuoteFields} from "../../hooks/react-hook-form/useCreateUpdateQuote";
import {StatusCode} from "../../constants/statusCodeConstants";
import {ModalActions} from "../../constants/modalActionConstants";
import EditQuoteModal from "../quote/EditQuoteModal";

interface Props {
    shownModal?: string,
    modalData?: any,
    onModalClose: () => void,
}

/**
 * Handles displaying and managing all modal dialog boxes, available to
 * signed-in users.
 */
const Modals: React.FC<Props> = ({shownModal, modalData, onModalClose}) => {

    const handleQuoteCreation = async (quoteData: CreateUpdateQuoteFields) => {
        const result = await API.createQuote(quoteData);
        if (result.status !== StatusCode.OK && result.status !== StatusCode.CREATED)
            alert('Posting the quote failed');  // ToDo: better UI for this
    };

    const handleQuoteEdit = async (quoteData: CreateUpdateQuoteFields) => {
        const result = await API.updateQuote(quoteData, modalData.id);
        if (result.status !== StatusCode.OK)
            alert('Unable to save the edited quote');
    }

    return (
        <>
            {shownModal === ModalActions.CREATE_QUOTE &&
                <CreateQuoteModal onCreate={handleQuoteCreation}
                                  onClose={onModalClose}/>
            }

            {shownModal === ModalActions.UPDATE_QUOTE &&
                <EditQuoteModal quote={modalData}
                                onEditingDone={handleQuoteEdit}
                                onClose={onModalClose}/>
            }
        </>
    )
};

export default Modals;