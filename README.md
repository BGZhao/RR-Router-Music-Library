# RR-Router-Music-Library
Activity 7.3.8-2
Code Along: Improve a Music Library Interface
## Overview
In this code-along, we again return to our Music Library application to add features and functionality.

So far, we have explored fetching and displaying data to our application and storing that data in Context. In this code-along, we will be adding react-router-dom to our music library to give our users a multi-page experience in a single-page application.

In this code-along, we will be adding an artist-view page to show albums by an artist, and an album-view page to show songs by album. We will use react-router-dom to display each of these pages independently, instead of rendering this content within an existing component.

Fell behind in the last code-along, or your code just isn't working? That's okay! To get caught up, find solution code at this repository: https://github.com/HackerUSA-CE/RR-Music-Search. The solution for this code-along is found on the branch part5.

## 1) Planning
As always, when adding new features to an application, we should begin the process by planning what we will set out to do.

First, let's consider what components we will need, and what state they will need to track.

Component: State
ArtistView: artistData
We need to send an artistId to this component to generate results for that artist's music
AlbumView: albumData
We need to send an albumId to this component to populate the songs in that album.

Cool! It doesn't look too complicated. We are effectively building components that will behave similarly to the App component, but a bit more specific in the results it returns. The x-factor here will be implementing react-router-dom and its features.


## 2) Setting Up
Before we get started, let's go ahead and develop a branch for these new features. We will be branching off of main for the purposes of this application, to avoid any confusion with merging these features with Context. If you are branching from RR-Music-Search, branch from part2. The branch, part2, is contains the complete code before begining context.

1.- From personal codebase:
- git checkout -b with_router
  - Click here to copy

2.- From RR-Music-Search codebase:
- git checkout -b with_router part2
  - Click here to copy

3.- Then we should install the react-router-dom npm package.
- npm install react-router-dom
  -Click here to copy

Next, let's stub out two files in our components directory to represent the views for our new pages:

### ArtistView.js
### AlbumView.js

In both files, let's go ahead and import any tools we already know we will need while we stub our component out:
in ArtistView.js

// These components will be making separate API calls from the app
// component to serve specific data about our artist

import { useState, useEffect } from 'react'

function ArtistView() {
    const [ artistData, setArtistData ] = useState([])

    return (
        <div>
            <p>Artist Data Goes Here!</p>
        </div>
    )
}

export default ArtistView

- Click here to copy
code in the AlbumView.js

// These components will be making separate API calls from the app
// component to serve specific data about a given album

import { useState, useEffect } from 'react'

function AlbumView() {
    const [ albumData, setAlbumData ] = useState([])

    return (
        <div>
            <p>Album Data Goes Here!</p>
        </div>
    )
}

export default AlbumView


Click here to copy
## 3) Render Components
Return to your app.js file. Perform a quick check of the quality of your code by importing and rendering both components. While we are here, let's import the tools we need from react-router-dom:
in the App.js file:

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    const API_URL = 'https://itunes.apple.com/search?term='

    useEffect(() => {
        if(search) {
            const fetchData = async () => {
                document.title = `${search} Music`
                const response = await fetch(API_URL + search)
                const resData = await response.json()
                if (resData.results.length > 0) {
                    return setData(resData.results)
                } else {
                    return setMessage('Not Found')
                }
            }
            fetchData()
        }
    }, [search])
    
    const handleSearch = (e, term) => {
        e.preventDefault()
        setSearch(term)
    }

    return (
        <div>
            <SearchBar handleSearch = {handleSearch}/>
            {message}
            <Gallery data={data} />
            <AlbumView />
            <ArtistView />
        </div>
    );
}

export default App;
Click here to copy

## 4) Wrap the Router
Great! We should now see our divs rendered to the screen. Now that we have the components we want to render displayed, let's pack the components into a Router then Routes so that we can render them selectively. To Place more than one component into an element, we use a Fragment to wrap the components.

- We will want the existing content, the searchbar, and gallery to render at the home route: '/'
- Meanwhile, the new components should each have their own route: '/album/:id' and '/artist/:id'
- Let's move our {message} outside of the router completely. We could still benefit from seeing that information regardless of which page we are viewing.

Just like prescribing parameter values with an express server, we can define parameters inside of our URL string by using the ':' character.

 
  ![imagecode](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/Screen%20Shot%202022-07-26%20at%201.38.27%20PM.png)

 

![image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/SD07-React-&-Redux-03.-React-Dataflow-Lesson-8-Code_Along.8.png?raw=true)

#### It can be helpful to visualize a router like a switchboard where only the address requested will be displayed by our app.

## 5) Develop the Component
Excellent! Now that we have labelled the components with route paths, we can worry about the actual component behavior.

First, let's test out our parameters feature. Add the below code to your AlbumView.js:
import { useParams } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Artist Data Goes Here!</p>
        </div>
    )
}

Click here to copy

Now, let's test out our route by going to the path we have prescribed:

![Image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/SD07-React-&-Redux-03.-React-Dataflow-Lesson-8-Code_Along.10.png?raw=true)

This worked, excellent! We now have the ability to get a variable from the URL bar into our application code.

Let's make sure to do the same thing to our AlbumView.js component while we are here. After all, it does work on the same principle.


import { useParams } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Album Data Goes Here!</p>
        </div>
    )
}


## 6) Build Links
Now that we have a way of getting parameters from our URL bar to our code, we just need to come up with a way to get our code to the URL bar. And manually typing every ID will not be an option.

Why don't we simply prescribe an <a> tag with the path as our href?

Let's prescribe a link to direct us to the URL of our ArtistView component and pass in the artist's unique ID as the parameters. Where might be the best place to put these links? We need it to be somewhere where the data is available for one given entry. Perhaps our detailView within GalleryItem.js would be good.

In GalleryItem.js,

add the following code:

![image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/R.png)


Test it out:

![insert image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/SD07-React-&-Redux-03.-React-Dataflow-Lesson-8-Code_Along.13.gif?raw=true)

From: ThriveDX


Well, that's not quite right, is it?


## 7) What Went Wrong
Our application certainly gets us to where we wanted to go, there is no question about that. However, if we watch carefully we can see a brief content flash. Did you notice it? Immediately after we click the link, we see a re-render of the blank app level.

Take a moment to inspect your component devtools when you click the link. Specifically, we want to be looking at the App-level state properties.

![image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/SD07-React-&-Redux-03.-React-Dataflow-Lesson-8-Code_Along.14.gif?raw=true)
From: ThriveDX

Well, there's the problem! When we navigate to the link, we are brought to a fresh render of our web page. And while it's not technically hurting very much for us to have state reset when we visit this component, it is not the behavior we were planning on and this can be considered a bug.

Now we have a little more insight into why we use <Link> tags with react-router-dom. Let's go ahead and fix our code.


## 8) Build Links: Part Two
Luckily, the <Link> tag from react-router-dom is set up to work a lot like a traditional <a> tag, so this fix can be rather easy.

Add the following code to GalleryItem.js:


![image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/z.png?raw=true)

And then test it out:
![image](https://github.com/BGZhao/RR-Router-Music-Library/blob/main/SD07-React-&-Redux-03.-React-Dataflow-Lesson-8-Code_Along.16.gif?raw=true)

From: ThriveDX

That's more like it!


## Looking Forward
At this point, our app is routing us to the pages we want to render, but our pages don't actually have any behavior.

In the coming lesson, we will be refactoring our ArtistView and AlbumView pages to display data, and then we can polish our application up to feature smooth navigation.
