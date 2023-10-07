import React, {EventHandler, useEffect, useState} from 'react';

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
        onCreate({body: body});

        setBody('');    // necessary cleanup
        handleClose();
    };

    const handleClose = () => setIsOpen(false);

    useEffect(() => setIsOpen(isShown), [isShown]);

    return (
        <div
            className={`fixed left-0 top-0 z-[1500] h-full w-full overflow-y-auto overflow-x-hidden
                        bg-[#0000005F] backdrop-blur-sm outline-none
                        ${isOpen ? 'block' : 'hidden'}`}>
            {/* ToDo: add 'opacity-0' to the following div to enable fade-in-out */}
            <div className="relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center
                            transition-all duration-300 ease-in-out
                            min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div className="relative flex w-full flex-col rounded-2xl
                                bg-white bg-clip-padding text-current shadow-lg p-6 space-y-6">
                    <h1 className="text-2xl lg:font-extralight">Are you feeling <span
                        className="text-orange">inspired?</span></h1>
                    <label htmlFor="quoteBody"><p>Post your quote and inspire others. You can edit or remove
                        your quotes on your profile.</p></label>
                    <textarea
                        className="outline-orange border-alt-orange border-2 rounded-xl px-5 py-3 mt-5
                                   focus:drop-shadow-sm resize-none"
                        id="quoteBody"
                        value={body}
                        onChange={handleBodyChange}
                        rows={4}
                        placeholder="Enter your quote here"
                    ></textarea>
                    <div className="flex flex-row space-x-5">
                        <button className="inline bg-orange
                                           py-1.5 px-8 rounded-full text-white cursor-pointer
                                           drop-shadow-md hover:shadow-lightener active:brightness-90"
                                onClick={handleCreate}>Post</button>
                        <button className="hover:shadow-lightener active:brightness-90 cursor-pointer"
                                onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuoteModal;
