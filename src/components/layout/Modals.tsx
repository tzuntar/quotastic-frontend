import React from "react";
import * as API from '../../api/Api';
import CreateQuoteModal from "../quote/CreateQuoteModal";
import {CreateUpdateQuoteFields} from "../../hooks/react-hook-form/useCreateUpdateQuote";
import {StatusCode} from "../../constants/statusCodeConstants";
import {ModalActions} from "../../constants/modalActionConstants";
import EditQuoteModal from "../quote/EditQuoteModal";
import {useModal} from "../../features/ModalContext";
import UserPrefsModal from "../user/UserPrefsModal";
import {PasswordUpdateFields} from "../../hooks/react-hook-form/useUpdateUserPrefs";

/**
 * Handles displaying and managing all modal dialog boxes, available to
 * signed-in users.
 */
const Modals: React.FC = () => {
    const { shownModal, setShownModal, modalData } = useModal();

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

    const handleUserPrefsSave = async (data: PasswordUpdateFields) => {
        const result = await API.updatePassword(data);
        if (result.status !== StatusCode.OK)
            alert('Saving your new password failed');
    }

    const handleModalClose = () => setShownModal(null);

    return (
        <>
            {shownModal === ModalActions.CREATE_QUOTE &&
                <CreateQuoteModal onCreate={handleQuoteCreation}
                                  onClose={handleModalClose}/>
            }

            {shownModal === ModalActions.UPDATE_QUOTE &&
                <EditQuoteModal quote={modalData}
                                onEditingDone={handleQuoteEdit}
                                onClose={handleModalClose}/>
            }

            {shownModal === ModalActions.USER_PREFERENCES &&
                <UserPrefsModal onSave={handleUserPrefsSave}
                                onClose={handleModalClose}/>
            }
        </>
    )
};

export default Modals;