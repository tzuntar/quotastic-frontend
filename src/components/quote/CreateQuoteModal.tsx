import React, {EventHandler, useState} from 'react';

interface Props {
    isShown: boolean,
    onCreate: EventHandler<any>
}

const CreateQuoteModal: React.FC<Props> = ({isShown, onCreate}) => {
    const [body, setBody] = useState('');
    const [isOpen, setIsOpen] = useState(isShown);

    const handleBodyChange = (e: any) => setBody(e.target.value);

    const handleCreate = () => {
        if (body.trim() === '') return;
        onCreate(body);

        setBody('');    // necessary cleanup
        handleClose();
    };

    const handleClose = () => setIsOpen(false);

    return (
        <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-container">
                <h1>Are you feeling <span>inspired?</span></h1>
                <label htmlFor="quoteBody">Type your quote in the box.</label>
                <textarea
                    className="form-input"
                    id="quoteBody"
                    value={body}
                    onChange={handleBodyChange}
                    rows={4}
                    placeholder="Enter your quote here"
                ></textarea>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={handleCreate}>Post</button>
                    <button className="btn" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateQuoteModal;
