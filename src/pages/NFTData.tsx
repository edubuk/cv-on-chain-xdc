import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";


interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  hash:string;
}

interface NFTGalleryProps {
  contractAddress: string;
  abi: ethers.ContractInterface;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ contractAddress, abi }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNFTs = async () => {
    const id=toast.loading("Fetching NFTs")
    try {
      setLoading(true);

      // Connect to Ethereum using MetaMask
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const account = await provider.send("eth_requestAccounts", []);
      console.log("account",account[0]);
      const signer = provider.getSigner();

      // Connect to the smart contract
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Fetch all token IDs from the contract
      const tokenIds = (await contract.getTokenIds(account[0].toString())).map((id: ethers.BigNumber) =>
        id.toString()
      );
      // Fetch metadata for each token ID
      const nftPromises = tokenIds.map(async (tokenId: string) => {
        const tokenUri: string = await contract.tokenURI(tokenId);
        const metadataUrl = `https://gateway.pinata.cloud/ipfs/${tokenUri}`;
        const response = await fetch(metadataUrl);
        const metadata = await response.json();

        return {
          id: tokenId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          hash:metadata.hash,
        };
      });
    
      const fetchedNFTs = await Promise.all(nftPromises);
      setNfts(fetchedNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
        toast.dismiss(id);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-[#006666] text-3xl font-bold text-center mb-6">NFT Gallery</h1>
      {loading ? (
        <p className="text-center text-lg">Loading NFTs...</p>
      ) : nfts.length === 0 ? (
        <p className="text-red-500 text-center text-lg">No NFTs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft,i) => (
            <div
              key={nft.id}
              className="flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
            >
              <img src={nft.image} alt={nft.name} className="w-20 h-20 object-cover items-center" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{nft.name} {i+1}</h2>
                <p className="text-sm text-gray-600">{nft.description}</p>
                <p className="text-sm text-gray-800 font-semibold mt-2 mb-4">Token ID: {nft.id}</p>
                 {nft?.hash&&<a className="text-[#ff7300] border border-[#0033ff] p-2 rounded-full hover:bg-[#006666] hover:text-white" href={`https://purple-odd-toad-540.mypinata.cloud/ipfs/${nft.hash}`} target="_blank">View Certificate</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
