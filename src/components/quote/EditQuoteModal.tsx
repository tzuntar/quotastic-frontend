import React, {EventHandler, useState} from "react";
import {QuoteType} from "../../models/quote";

interface Props {
    quote: QuoteType,
    onEditingDone: EventHandler<any>,
    onClose: () => void,
}

const EditQuoteModal: React.FC<Props> = ({quote, onEditingDone, onClose}) => {
    const [body, setBody] = useState(quote.body);

    const handleBodyChange = (e: any) => setBody(e.target.value);

    const handleEditingDone = () => {
        if (body.trim() === '') return;
        onEditingDone({body: body});
        onClose();
    };

    return (
        <div
            className={`fixed left-0 top-0 z-[1500] h-full w-full overflow-y-auto overflow-x-hidden
                        bg-[#0000005F] backdrop-blur-sm outline-none`}>
            {/* ToDo: add 'opacity-0' to the following div to enable fade-in-out */}
            <div className="relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center
                            transition-all duration-300 ease-in-out
                            min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div className="relative flex w-full flex-col rounded-2xl
                                bg-white bg-clip-padding text-current shadow-lg p-6 space-y-6">
                    <h1 className="text-2xl lg:font-extralight">Edit your <span
                        className="text-orange">quote.</span></h1>
                    <label htmlFor="quoteBody" className="hidden">Edit your quote</label>
                    <textarea
                        className="outline-orange border-alt-orange border-2 rounded-xl px-5 py-3 mt-5
                                   focus:drop-shadow-sm resize-none"
                        id="quoteBody"
                        value={body}
                        onChange={handleBodyChange}
                        rows={4}
                        placeholder="Type your quote here"
                    ></textarea>
                    <div className="flex flex-row space-x-5">
                        <button className="inline bg-orange
                                           py-1.5 px-8 rounded-full text-white cursor-pointer
                                           drop-shadow-md hover:shadow-lightener active:brightness-90"
                                onClick={handleEditingDone}>Save
                        </button>
                        <button className="hover:shadow-lightener active:brightness-90 cursor-pointer"
                                onClick={() => onClose()}>Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuoteModal;
