import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export function Favourite() {
    
    const [favourite,setFavourite] = useState(JSON.parse(localStorage.getItem("favourite")) || []);

    useEffect(()=>{
        localStorage.setItem("favourite",JSON.stringify(favourite));
    },[favourite])

    const handleDel = (id)=>{
        let filtered = favourite.filter((ele)=> ele.id !== id);
        setFavourite(filtered);
    }

    return (
        <Box w="90%" m="auto" mt="30px" mb="20px">
            <Text fontWeight="bold" fontSize="20px" mb="15px" textAlign="center">Total Favourite Items:- {favourite.length}</Text>

            <SimpleGrid columns="4" gap="20px" mt="15px">
                {
                    favourite.map((ele)=>(
                        <Box key={ele.id} bg="#f7ffd6" boxShadow='rgba(0, 0, 0, 0.623) 0px 3px 8px'>
                            <Image src={ele.image} alt={ele.id} />
                            <Text fontWeight="semibold" ml="15px">Name:- {ele.name}</Text>
                            <Text fontWeight="semibold" ml="15px">Status:- {ele.status}</Text>
                            <Text fontWeight="semibold" ml="15px">Species:- {ele.species}</Text>
                            <Text fontWeight="semibold" ml="15px">Gender:- {ele.gender}</Text>
                            <Text fontWeight="semibold" ml="15px">Total Episodes:- {ele.episode.length}</Text>
                            <Text onClick={()=> handleDel(ele.id)} cursor="pointer" textAlign="center" m="auto" bg="#ff9090" w="40px" mb="10px">❌</Text>
                        </Box>
                    ))
                }
            </SimpleGrid>
        </Box>
    )
}
