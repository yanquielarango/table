import React, { useMemo } from 'react';
import { useState } from 'react';
import './App.css';

import articles from './utils';



const App = () => {
  
  let variant = {
    voted: 'Most upvoted',
    date: 'Most Recently'

  }

  const [article, setArticle] = useState(articles);
  const [sort, setSort] = useState('');

  // console.log(article)
  console.log(variant.voted)

  // const sortArticles = () => {
  //   const sorted = [...article];
  //   if (sort === variant.voted) {
  //     sorted.sort((a, b) => b.upvotes - a.upvotes);
  //   }
  //   if (sort === variant.date) {
  //     sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   }
  //   setArticle(sorted);
  // }


  const sortArticles = useMemo( () => {
    let  result = [...article];
    if(sort === variant.voted) {
      result.sort((a, b) => {
        if(a.upvotes > b.upvotes) return -1;
        if(a.upvotes < b.upvotes) return 1;
        return 0;
      })
    }

    if(sort === variant.date) {
      result.sort((a, b) => {
        if(a.date > b.date) return -1;
        if(a.date < b.date) return 1;
        return 0;
      })
    }
    return result;
  },[sort, articles])



  return (
    <div className='container'>
        <div className='sort'>
          <p>SORT BY</p>
          <button  onClick={ () => setSort(variant.voted)}>Most upvoted</button>
          <button onClick={ () => setSort(variant.date)}>Most Recently</button>
          <button onClick={ () => setSort('')}>Reset the table</button>
        </div>

        <table>
        <thead>
          <tr>
            <th>Title</th>
            <th >Upvotes</th>
            <th>
            Date
            </th>            
          </tr>
        </thead>
        <tbody>
          {sortArticles.map((article) => (
            <tr>
              <td>{article.title}</td>
              <td>{article.upvotes}</td>
              <td>{article.date}</td>

            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  )
}

export default App