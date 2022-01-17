import "./App.css";
import Product from "./Product";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function App() {


  //Fetching Data from API

    const [data,setData]=useState([]); 
    
    useEffect(() =>{

    const fetchProducts = async()=>{
      const response  = await fetch("https://fakestoreapi.com/products")
      const productsData= await response.json();
      setData(productsData);
    };
    fetchProducts();
  }, []);

 


  //Input control for category filtering

  const [selectedCat,setSelectedCat]=useState("all");
  const  selectedCatHandler = (event)=>{
    setSelectedCat(event.target.value)
  }

  //Input Control for sorting
  const [sortFunction, setSortFunction]=useState("");
  const selectedSortHandler = (event)=>{
    setSortFunction(event.target.value);
  }

  //pagination settings and control

  const [page, setPage] = useState(0);
  const itemsPerPage=5;
  const pagesVisited= page*itemsPerPage;
  
  const changePageHandler=({selected})=>{
    setPage(selected);
  };

  
  //sorting functions
  const sortByPrice=(a,b)=>{
    return a.price - b.price;
  }
  const sortByRating=(a,b)=>{
    return a.rating.rate - b.rating.rate;
  }
  const sortByPriceDec=(a,b)=>{
    return b.price- a.price ;
  }
  const sortByRatingDec=(a,b)=>{
    return  b.rating.rate - a.rating.rate ;
  }
  


  //filtering Data

  let filteredData=undefined;
  if(selectedCat==="all"){
    filteredData=data;
  }
  else{
    filteredData=data.filter(item=>
      item.category=== selectedCat
    )
  }

    //sorting data

    let sortedData=undefined;
    if(sortFunction===""){
      sortedData=filteredData;
    }
    else if(sortFunction==="rating"){
      sortedData=filteredData.sort(sortByRating)
    }
    else if(sortFunction==="price"){
      sortedData=filteredData.sort(sortByPrice);
    }
    else if(sortFunction==="ratingDec"){
      sortedData=filteredData.sort(sortByRatingDec)
    }
    else if(sortFunction==="priceDec"){
      sortedData=filteredData.sort(sortByPriceDec);
    }
  

  


  //Displaying Data

  const displayData = sortedData.slice(pagesVisited,pagesVisited+itemsPerPage).map((item) =>{
    
      return(
      <Product item={item} />
      ); 
    });


  
  

  
  //Categories deduced from data

  let categories=[];
  
  data.map(item=>{
    if(!(categories.includes(item.category))){
      categories.push(item.category);
    }
  });


  


  return (
    <div className="App">
      <header className="App-header">
        <h1>Matious Test #1</h1>
        

        {/* Dropdowns Start*/}

        <div className="options">
          <select id="catgories" name="categories" onChange={selectedCatHandler}>
            <option value="all">All Categories</option>
            {categories.map(category=>{
              return(
                <option value={category}>{category}</option>
              );
            })}
          </select>

          <select id="sort" name="sort"onChange={selectedSortHandler}>
            <option value="" >Sort Results</option>
            <option value="rating">Sort by Rating Ascending</option>
            <option value="price">Sort by Price Ascending</option>
            <option value="ratingDec">Sort by Rating descending</option>
            <option value="priceDec">Sort by Price descending</option>
          </select>
        </div>

        {/* Dropdowns End */}





        {/* Products Table Start */}

        <div className="productsTable">
          
          {displayData}

        </div>

        {/* Products Table End */}




        {/* Pagination Start */}

        <ReactPaginate 
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredData.length/itemsPerPage)}
          onPageChange={changePageHandler}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"paginationPrevBtn"}
          nextLinkClassName={"paginationNextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />

        {/* Pagination End */}

      </header>
    </div>
  );
}

export default App;
