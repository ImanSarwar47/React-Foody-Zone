import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/Search Result/SearchResult';
export const BASE_URL = "http://localhost:9000";
const App = () => {
  const[data,setData]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const[filterData,setFilterData] = useState(null);
  const[selectedBtn,setSelectedBtn] = useState("all");

  useEffect(()=>{
    const fetchFoodData = async () => {
      setLoading(true);
      try{
          const response = await fetch(BASE_URL);
          const json = await response.json();
          setData(json);
          setFilterData(json);
          setLoading(false);
      }
      catch(error){
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  },[]);
  console.log(data);
  if(error) return <div>{Error}</div>;
  if(loading) return <div>Loading...</div>

const searchFood = (e)=>{
    const searchValue = e.target.value;

    if(searchValue==" "){
      setFilterData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilterData(filter);
};

const filterFood=(type)=>{
  if(type=="all"){
    setFilterData(data);
    setSelectedBtn('all');
    return;
  }
  const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
  setFilterData(filter);
  setSelectedBtn(type);

}

  const filterBtns=[
    {name:"All",
    type:"all",
    },
    {name:"Breakfast",
    type:"breakfast",
    },
    {name:"Lunch",
    type:"lunch",
    },
    {name:"Dinner",
    type:"dinner",
    },
    
  ]
  return <>
  <Container>
    <TopContainer>
      <div className='logo'>
        <img src='/Foody Zone.svg' alt='logo' />
      </div>
      <div className='search'>
        <input onChange={searchFood} placeholder='Search Food...' />
      </div>
    </TopContainer>

    <FilterContainer>
    {
      filterBtns.map((value)=>(
        <Button
        isSelected = {selectedBtn==value.type}
         key={value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>
      ))
    }
    </FilterContainer>

    </Container>
      <SearchResult data={ filterData } />
      </>
};

export default App;


export const Container = styled.div`
      max-width: 700px;
      margin: 0 auto;
`;
const TopContainer = styled.section`
      min-height: 100px;
      display: flex;
      justify-content: space-between;
      padding: 11px;
      align-items: center;

      .search{

        input{
        background-color: transparent;
        border: 1px solid #FF0909;
        color:#FFFFFF;
        border-radius: 3px;
        font-size: 17px;
        height: 20px;
        padding: 0 7px;
        &::placeholder{
          color:white;
        }
        }
      }

      @media (0 < width < 600px) {
        flex-direction: column;
        height:120px;
      }
`;

const FilterContainer = styled.section`
      display: flex;
      justify-content: center;
      gap: 9px;
      padding-bottom: 20px;
`;

export const Button = styled.button`
    border-radius: 5px;
    background-color: ${({isSelected}) => (isSelected? "#F22f2f" : "#FF4343")};
    outline: 1px solid ${({isSelected}) => (isSelected? "white" : "#FF4343")};
    padding: 6px 9px;
    border: none;
    color: white;
    cursor: pointer;
    &:hover{
      background-color: #F22f2f;
    }
`;