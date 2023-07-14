import Button from './button'

export default function Modal(props: { children: React.ReactNode, visible: boolean, setVisible: (visible: boolean) => void }) {
    if (!props.visible) return <></>
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-paper-900 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                        <div className="bg-paper-500 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                </div>
                                <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                        <div className="bg-linen px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button onClick={() => props.setVisible(false)} className="w-full justify-center sm:w-auto">Got it!</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
