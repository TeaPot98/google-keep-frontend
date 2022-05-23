import React from 'react'
import '../style.css'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Note from './Note'

const NoteMasonry = ({ notes, labels }) => {
  return (
    <ResponsiveMasonry 
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4, 1900: 6}}
    >
        <Masonry
            gutter="15px"
        >
            {notes.map(n => 
                <Note 
                    key={n.id}
                    note={n}
                    labels={labels}
                />
            )}
        </Masonry>
    </ResponsiveMasonry>
  )
}

export default NoteMasonry