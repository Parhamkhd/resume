import {useEffect,useState} from 'react'

function Input(props){

    const [inputFocus, setInputFocus] = useState(false);
    const [inputHasValue, setInputHasValue] = useState(false);

    function setFocusOut(event){
        if(event.target.value !== ""){
            setInputHasValue(true)
        }else{
            setInputHasValue(false)
            setInputFocus(false)
        }
    }

    function dataBack(data){
        props.handler(data)
    }


    useEffect(() => {
      changeHandler(props.value)
    }, [props.value]);

    function changeHandler(value){
        if(value !== ""){
            setInputFocus(true)
        }else{
              setInputHasValue(false)
            setInputFocus(false)
        }
    }

    useEffect(() => {
        console.log(props.hasError)
    }, [props.hasError]);

    useEffect(() => {
        console.log(props.value,"props.value props.value props.value props.value props.value")
    }, [props.value]);

    return(
        <div className="input-wrapper">
            <label className="normal-input-label">
                <span className={`normal-input-label-text ${inputFocus?"focused":""} ${inputHasValue?"has-value":""} ${props.hasError?"has-error":""}`}>{props.label}</span> 
                <input className={`normal-input ${inputFocus?"focused":""} ${inputHasValue?"has-value":""} ${props.hasError?"has-error":""} `} value={props.value} onFocus={()=>{setInputFocus(true)}} onBlur={(e)=>{setFocusOut(e)}} onChange={(e)=>{dataBack({data:e.target.value,name:props.name,importantField:props.important});changeHandler(e.target.value)}} type="text"/>
            </label>
            {props.hasError?
                <div className="error-text"> وارد کردن {props.label} الزامی می‌باشد.</div>
            :
            <>
            </>}
        </div>
    )
}

export default Input;