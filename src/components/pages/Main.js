import {useState,useEffect} from 'react'
import Modal from '../common/Modal'
import Input from '../common/Input'

function Main(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorList, setErrorList] = useState("");

    const [showDeleteModal,
        setShowDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId,
        setEditId] = useState("");
    const [contacts,setContacts] = useState([])
        const [idToDelete,
        setIdToDelete] = useState("");
    function formDataChecker(input){
        console.log(input,"fooooorm chgecekere")
            if ((input.data === "" || !input.data.trim()) && input.importantField === true) {
        setErrorList(errorList => [
            ...errorList,
            input.name
        ]);
            } else {
                if (errorList.includes(input.name)) {
                    setErrorList(errorList.filter(e => e !== input.name));
                }
            }
    console.log(errorList,"errorList")

       switch (input.name) {
           case "firstName":
               setFirstName(input.data)
           break;
           case "lastName":
               setLastName(input.data)
           break; 
           case "phoneNumber":
               setPhoneNumber(input.data)
           break;
           default:
               break;
       }
    }
    function resetForm(){
        setFirstName("")
        setLastName("")
        setPhoneNumber("")

    }

    function submit(){
 let dataPack = [
            {
                name: "first-name",
                data: firstName,
                importantField: true
            }, {
                name: "last-name",
                data: lastName
            }, {
                name: "phone-number",
                data: phoneNumber,
                importantField: true
            }
        ]
             let tempContact = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        }
        let errorsArray = [];

            dataPack.forEach(function (data) {
            if (data.data === "" && data.importantField) {
                if (!(errorsArray.includes(data.name))) {
                    errorsArray.push(data.name)
                }
            } else if (errorsArray.includes(data.name)) {
                errorsArray.filter(e => e !== data.name);
            }

        })
        setErrorList(errorsArray)
        if (errorsArray.length === 0) {
                setContacts(contacts => [
                ...contacts,
                tempContact
            ]);
            resetForm();
        }
    }
    function submitFormData(){
        console.log("can submit")
    }

    function editContact(id){
         setEditMode(true);
        let thisPerson = contacts.filter(function (person, index) {
            let currentIndex = ++index;
            return id === currentIndex
        })
        for (let item in thisPerson[0]) {
            if (thisPerson[0][item] !== undefined) {
                if(!Array.isArray(thisPerson[0][item])){
                    formDataChecker({name: item, data: thisPerson[0][item]})

                }
            }
            setEditId(id)
        }

    }

        function deleteSelf(id) {
        setContacts(contacts.filter(function (items, index) {
            let currentIndex = ++index;
            return currentIndex !== id
        }))
    }
      function deletePerson(id) {
        setIdToDelete(id);
        setShowDeleteModal(true);
    }

    function modalHandler(proceedResult) {
        if (proceedResult) {
            deleteSelf(idToDelete);
            setShowDeleteModal(false);
        } else {
            setShowDeleteModal(false);
        }
    }

    useEffect(() => {
            console.log(firstName,"firstName asdasda")
    }, [firstName]);

    function editContacts(){
     if (errorList.length === 0) {
            let tempContact = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
            };
            let allContactPersons = contacts;
            let currentId = editId;
            allContactPersons[--currentId] = tempContact;
            setContacts([...allContactPersons]);
            resetForm();
            setEditMode(false);

        }
    }

    function deleteContact(){

    }

    return(
        <>
    <div className="main-wrapper">

        <div className="main-info">
            <span className="main-info-text">اپلیکیشن دفترچه تلفن خردمند</span>
        </div>
        <div className="inputs-wrapper">
            <div className="single-wrapper">
                <Input label={"نام"} name="firstName" handler={formDataChecker} value={firstName} important={true} hasError={errorList.includes("first-name")}/>
            </div>

            <div className="single-wrapper input-margin">
                <Input label={"نام خانوادگی"} name="lastName" handler={formDataChecker}  value={lastName}/>
            </div>

            <div className="single-wrapper">
                <Input label={"شماره تماس"} name="phoneNumber" handler={formDataChecker}  value={phoneNumber} important={true} hasError={errorList.includes("phone-number")}/>
            </div>
     

        </div>

        <div className="submit-wrapper">
                              {editMode
                                ? <button className="submit-btn" onClick={() => editContacts()}>
                                        ویرایش کاربر
                                    </button>
                                : <button className="submit-btn" onClick={() => submit()}>
                                   ثبت کاربر
                                </button>
}
        </div>

        <div className="table-wrapper">
               <table className="contact-persons-table">
                                <thead>
                                    <tr className="table-labels">
                                        <th className="contact-person-table-heading id ">#</th>
                                        <th className="contact-person-table-heading">نام</th>
                                        <th className="contact-person-table-heading">نام خانوادگی</th>
                                        <th className="contact-person-table-heading">شماره تماس</th>
                                        <th className="contact-person-table-heading">عملیات</th>

                                    </tr>
                                </thead>

                                <tbody className="table-data-tr-wrapper" id="table-data-tr-wrapper">

                                    {contacts.length >= 1
                                        ? (contacts.map(function (item, index) {
                                            let id = ++index;

                                            return (
                                                <tr className="table-data-tr">
                                                    <td className="table-data id">{id}</td>
                                                    <td className="table-data">{item.firstName}</td>
                                                    <td className="table-data">
                                                            {item.lastName}
                                                    </td>
                                                    <td className="table-data">{item.phoneNumber}</td>
                                                    <td className="table-data">
                                                        <span className="contact-persons-list-content-item action d-flex">
                                                            <img
                                                                className="small-icon edit"
                                                                src="assets/images/edit-icon.svg"
                                                                onClick={(e) => editContact(id)}
                                                                onMouseEnter={(e) => (e.target.src = "assets/images/edit-icon-hovered.svg")}
                                                                onMouseLeave={(e) => {
                                                                (e.target.src = "assets/images/edit-icon.svg")
                                                            }}
                                                                alt=""/>
                                                            <img
                                                                className="small-icon"
                                                                src="/assets/images/trash.svg"
                                                                onClick={(e) => deletePerson(id)}
                                                                onMouseEnter={(e) => (e.target.src = "assets/images/trash-hover.svg")}
                                                                onMouseLeave={(e) => {
                                                                (e.target.src = "assets/images/trash.svg")
                                                            }}
                                                                alt=""/>

                                                        </span>
                                                    </td>

                                                </tr>

                                            )
                                        }))
                                        : ( <></>
                  )}

                                </tbody>
                            </table>
        </div>
    </div>
                {
        showDeleteModal
            ? <Modal
                    modalType="danger"
                    modalMainText="آیا از حذف این فرد مطمئن هستید؟"
                    modalSubText="این عمل غیر قابل بازگشت است!"
                    hasExtraAction={true}
                    modalActionText="بله "
                    modalCloseText="خیر"
                    proceedAction={modalHandler}/>
            : <> </>
    }
        </>
    )
}

export default Main;