import { useState } from "react"

export const ListComponent = () => {

    // state that holds what view (component) is being displayed
    const [ currentContentView, setCurrentContentView ] = useState("lists")

    // states holding active and archived lists
    const [ lists, setLists ] = useState([])
    const [ archivedLists, setArchivedLists ] = useState([])
    

    // map the lists for display
    const mappedLists = lists.map(list => {
        
        const handleDeleteListClick = (event) => {
            event.preventDefault()
            // make a new array without the deleted list
            let newLists = lists.filter(list => list.id != event.target.id)           
            // update the lists state with new array
            setLists(newLists)            
        }

        const handleArchiveListClick = (event) => {
            event.preventDefault()
            // make a new array without the archived list
            let newLists = lists.filter(list => list.id != event.target.id)
            let archivedList = lists.filter(list => list.id == event.target.id)            
            setLists(newLists)
            setArchivedLists([...archivedLists, archivedList[0]])
        }
        
        
        return (
            <div key={list.id} className="">
                <p>{list.title}</p>
                <button onClick={handleDeleteListClick} id={list.id} className="">delete</button>
                <button onClick={handleArchiveListClick} id={list.id} className="">archive</button>
            </div>
        )
    })

    // map the archivedLists for display
    const mappedArchivedLists = archivedLists.map(list => {        

        const handleDeleteArchiveListClick = (event) => {
            event.preventDefault()
            // filter list out of archivedLists
            let newArchives = archivedLists.filter(list => list.id != event.target.id)
            // reset archivedLists state
            setArchivedLists(newArchives)
        }

        return (
            <div className="">
                <p>{list.title}</p>
                <button onClick={handleDeleteArchiveListClick} id={list.id} className="">delete</button>
            </div>
        )
    })

    const NavButtons = () => {
        // nav buttons to switch between views

        const handleNavClick = (event) => {
            // changes currentContentView to the button clicked on
            event.preventDefault()
            setCurrentContentView(event.target.innerText)            
        }

        return (
            <div className="">
                <button onClick={handleNavClick}>new list</button>
                <button onClick={handleNavClick}>lists</button>
                <button onClick={handleNavClick}>archives</button>
            </div>
        )
    }

    const ListForm = () => {
        // form to make new lists

        const handleSubmitList = (event) => {
            event.preventDefault()
            let title = event.target[0].value
            
            // make up an id since we don't have a db
            let listElement = lists.slice(-1)
            let listId 
            // if there is a list in listElement, set listId to listElement.id + 1
            // else set listId to 1
            {listElement.length > 0 ? listId = listElement[0].id + 1 : listId = 1}

            // make list object
            let newList = {title: title, id: listId}            

            // add newList to lists state
            setLists([...lists, newList])          

        }

        return (
            <form onSubmit={handleSubmitList}>
                <input type="text" placeholder="list name"></input>
                <button type="submit">create</button>
            </form>
        )
    }

    const ListsView = () => {
        return (
            <>
                {mappedLists}
            </>
        )        
    }

    const ArchivesView = () => {
        return (
            <>
                {mappedArchivedLists}
            </>
        )
    }

    const CurrentContent = () => {
        // component that displays current content div
        // conditionally rendered based on currentContentView state

        return (
            <div className="">
                {currentContentView == "new list" ?
                    <ListForm />
                :
                currentContentView == "lists" ?
                    <ListsView />
                :
                currentContentView == "archives" ?
                    <ArchivesView />
                :
                null                
                }
                
            </div>
        )
    }

   // this return is what the entire ListComponent returns
   // this is ran in App.jsx
    return (
        <>
            <NavButtons />
            <CurrentContent />
        </>
    )
}