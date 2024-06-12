import { useState } from "react"

export const ListComponent = () => {

    // state that holds what view (component) is being displayed
    const [ currentContentView, setCurrentContentView ] = useState("lists")

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

        return (
            <form>
                <input type="text" placeholder="list name"></input>
                <button type="submit">create</button>
            </form>
        )
    }

    const ListsView = () => {
        return (
            <p>lists view</p>
        )        
    }

    const ArchivesView = () => {
        return (
            <p>archievs view</p>
        )
    }

    const CurrentContent = () => {
        // component that holds current content div
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