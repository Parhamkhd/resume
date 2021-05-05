

function Modal(props){

    return(
        <div className="modal-wrapper">
            <div className="modal-contents">
        <div className={(props.modalType === "danger") ? "danger-wrapper" : "success-wrapper"}>
            <div className={"modal-text" + " " + (props.noMargin ? "extra-margin-top" : "")}>
               <span className={"modal-main-text d-block" + " " + (props.noMargin ? "no-bottom-margin" : "")}>{props.modalMainText}</span> 
               <span className="modal-sub-text d-block">{props.modalSubText}</span> 

            </div>

            <div className="modal-actions">

                    <button className={"modal-close-btn" + " " + (props.modalType === "danger" ? "danger" : "")} onClick={()=> props.proceedAction(false)}>{props.modalCloseText}</button>
                {
                    props.hasExtraAction
                    ?
                    <button className="modal-action-btn" onClick={()=> props.proceedAction(true)}>{props.modalActionText}</button>
                    :
                    <>
                    </>
                }

            </div>
        </div>
        </div>
        </div>
    )
}

export default Modal;