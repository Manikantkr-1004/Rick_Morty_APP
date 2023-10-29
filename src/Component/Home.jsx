import { Box, Image, Checkbox, SimpleGrid, Text, Flex, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"

export function Home() {

    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [fav,setFav] = useState(JSON.parse(localStorage.getItem("fav")) || [])
    const [favourite,setFavourite] = useState(JSON.parse(localStorage.getItem("favourite")) || [])
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((res)=>{
            setLoading(false)
            setData(res.data.results)

        }).catch((err)=>{
            console.log(err);
            setLoading(false)
        })
    },[page])

    useEffect(()=>{
        localStorage.setItem("fav",JSON.stringify(fav));
    },[fav])

    useEffect(()=>{
        localStorage.setItem("favourite",JSON.stringify(favourite));
    },[favourite])
    
    function handleAdd(id){
        let check = fav.find((ele)=> ele.id === id);
        
        if(check){
            let filtered = fav.filter((ele)=> ele.id !== id);
            setFav(filtered);
        }else{
            let single = data.find((ele)=> ele.id === id);
            setFav((prev)=> [...prev,single]);
        }
    }

    function handleFavourite(){
        setFavourite((prev)=> [...prev,...fav])
        localStorage.removeItem("fav");
        setFav([]);
    }

    function checking(id){
        let check = favourite.find((ele)=> ele.id === id);
        
        if(check){
            return true;
        }else{
            return false;
        }
    }

    function handleCheck(id){
        let check = fav.find((ele)=> ele.id === id);
        
        if(check){
            return true;
        }else{
            return false;
        }
    }

    return (
        <Box w="90%" m="auto" mt="30px">
            {loading && <Image m="auto" src='https://www.onwebchat.com/img/spinner.gif' alt="loader" />}

            {fav.length>0 && <Box w="100%" position="sticky" top="0px" p="10px 0px">
                <Button onClick={handleFavourite} border="1px solid #9c9c9c">Add Selected Items in Favourite</Button>
            </Box>}

            <SimpleGrid columns="4" gap="20px" mt="15px">
                {
                    data.map((ele)=>(
                        <Box key={ele.id} bg="#f7ffd6" boxShadow='rgba(0, 0, 0, 0.623) 0px 3px 8px'>
                            <Image src={ele.image} alt={ele.id} />
                            <Text fontWeight="semibold" ml="15px">Name:- {ele.name}</Text>
                            <Text fontWeight="semibold" ml="15px">Status:- {ele.status}</Text>
                            <Text fontWeight="semibold" ml="15px">Species:- {ele.species}</Text>
                            <Text fontWeight="semibold" ml="15px">Gender:- {ele.gender}</Text>
                            <Text fontWeight="semibold" ml="15px">Total Episodes:- {ele.episode.length}</Text>
                            {checking(ele.id) ? <Text fontWeight="semibold" ml="15px" color="blue">It is in Favourite</Text> : 
                            <Checkbox isChecked={handleCheck(ele.id)} onChange={()=> handleAdd(ele.id)} fontWeight="semibold" ml="15px" mb="15px">Select it.</Checkbox>}
                        </Box>
                    ))
                }
            </SimpleGrid>

            <Flex w="90%" justifyContent='center' m='auto' gap="3px" alignItems="center" mt="20px" mb="20px">
                <Button variant="unstyled" bg={page===1? "#505050":"#000"} color="white" p="0px 20px" isDisabled={page===1} onClick={()=> setPage((prev)=> prev-1)}>Preview</Button>
                <Text fontWeight="bold" m="0px 10px" fontSize="20px">{page}</Text>
                <Button variant="unstyled" bg={page===42? "#505050":"#000"} color="white" p="0px 20px" isDisabled={page===42} onClick={()=> setPage((prev)=> prev+1)}>Next</Button>
            </Flex>
        </Box>
    )
}
