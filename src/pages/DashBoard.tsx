import { Button } from "@/components/ui/button"
import { useState } from "react"
//import OnChainData from "./OnChainData";
import CvById from "./CvById";
import { connectWallet } from "@/api/contract.api";
import toast from "react-hot-toast";
import { useCvFromContext } from "@/context/CvForm.context";
import { API_BASE_URL } from "@/main";
import { contractNFTAddress,abiNFT } from "@/contract/nft.contractData";
import NFTGallery from "./NFTData";

const DashBoard = () => {
    const [isActiveButton , setActiveButton] = useState<boolean>(true);
    const {account,setAccount} = useCvFromContext();
 //   const [docData, setDocData] = useState([]);
    const [cvData, setCvData] = useState([]);
    const [isNFT, setNFT] = useState<boolean>(false);

    // const getDoc = async()=>{
    //   try{
    //   const contract = await getContract();
    //   const tx = await contract?.getStudentHashes();
    //   console.log("tx",tx)
    //   setDocData(tx);
    //   if(tx.length===0)
    //   {
    //     toast.error("No certificate available")
    //   }
    // }catch(err)
    // {
    //   toast.error("something went wrong");
    //   console.log(err);
    // }
    //  }

     const getAccount = async()=>{
      try
      {
        const acc = await connectWallet();
        if(acc)
        setAccount(acc);
        console.log("logged acc",acc);
      }
      catch(e){
        console.log("error",e)
      }
     }

    //  const fetchDataHandler=()=>{
    //   setActiveButton(false);
    //   getDoc();
    //  }

     const fetchIds = async()=>{
      const id=toast.loading("document fetching...")
      try{
        const loginMailId= sessionStorage.getItem("userMailId");
        const response = await fetch(`${API_BASE_URL}/cv/getCvIds/${loginMailId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if(data.Ids.length===0)
        {
          return toast.error("No CV found")
        }
        setCvData(data?.Ids);
        toast.dismiss(id);
        //console.log("ids response",data?.Ids);
        //if(response)
      }
      catch(err){
        toast.dismiss(id);
        toast.error("something went wrong")
        console.log("error while fetching all doc ids",err)
      }
     }

     const idFetchHandler = ()=>{
      setActiveButton(true)
      setNFT(false);
      fetchIds();
     }
     const nftFetchHandler = ()=>{
      setActiveButton(false)
      setNFT(true);
     }

  return (
    <div className="flex flex-col justify-start items-center h-[80vh] w-screen">
        <div className="flex justify-center items-start gap-2 w-screen">
        <Button className={`text-center border border-slate-300 text-[#006666] hover:bg-slate-100 ${isActiveButton?"bg-slate-100":"bg-white border"}`} onClick={idFetchHandler}>Get Your CV</Button>
        {!account?
        <Button type="button" onClick={getAccount}>Connect Wallet</Button>:
        <>
        {/* <Button className={`text-center border border-slate-300 text-[#006666] hover:bg-slate-100 ${!isActiveButton?"bg-slate-100":"bg-white border"}`} onClick={fetchDataHandler}>Fetch your on-chain documents</Button> */}
        <Button className={`text-center border border-slate-300 text-[#006666] hover:bg-slate-100 ${            isNFT?"bg-slate-100":"bg-white border"}`} onClick={nftFetchHandler}>Fetch your NFTs</Button>
        </>
}
        </div>
        <div className="flex justify-center items-center gap-2 h-screen">
          {/* {
            !isActiveButton&&<OnChainData docData={docData}/>
          } */}
          {
            isActiveButton&&<CvById cvData={cvData}/>
          }
          {
            isNFT&&<NFTGallery contractAddress={contractNFTAddress} abi={abiNFT}/>
          }
        </div>
    </div>
  )
}

export default DashBoard
