import BitcoinLogo from "./public/assets/Coins/Bitcoin.png";
import EthereumLogo from "./public/assets/Coins/Ethereum.png";
import BinanceCoinLogo from "./public/assets/Coins/Binance_Coin.png";
import CardanoLogo from "./public/assets/Coins/Cardano.png";
import SolanaLogo from "./public/assets/Coins/Solana.png";
import XRPLogo from "./public/assets/Coins/XRP.png";
import PolkadotLogo from "./public/assets/Coins/Polkadot.png";
import DogecoinLogo from "./public/assets/Coins/Dogecoin.png";
import TerraLogo from "./public/assets/Coins/Terra.png";
import LitecoinLogo from "./public/assets/Coins/Litecoin.png";
import AvalancheLogo from "./public/assets/Coins/Avalanche.png";
import BitcoinCashLogo from "./public/assets/Coins/Bitcoin_Cash.png";
import AlgorandLogo from "./public/assets/Coins/Algorand.png";
import PolygonLogo from "./public/assets/Coins/Polygon.png";
import StellarLogo from "./public/assets/Coins/Stellar.png";
import VeChainLogo from "./public/assets/Coins/VeChain.png";
import InternetComputerLogo from "./public/assets/Coins/Internet_Computer.png";
import CosmosLogo from "./public/assets/Coins/Cosmos.png";
import FilecoinLogo from "./public/assets/Coins/Filecoin.png";
import EthereumClassicLogo from "./public/assets/Coins/Ethereum_Classic.png";
import TRONLogo from "./public/assets/Coins/TRON.png";

interface Coins {
  id: number;
  Name: string;
  Symbol: string;
  Image: any;
}
export const SupportedCoins: Array<Coins> = [
  {
    id: 1,
    Name: "Bitcoin",
    Symbol: "BTC",
    Image: BitcoinLogo,
  },
  {
    id: 2,
    Name: "Ethereum",
    Symbol: "ETH",
    Image: EthereumLogo,
  },
  {
    id: 3,
    Name: "Binance Coin",
    Symbol: "BNB",
    Image: BinanceCoinLogo,
  },
  {
    id: 4,
    Name: "Cardano",
    Symbol: "ADA",
    Image: CardanoLogo,
  },
  {
    id: 5,
    Name: "Solana",
    Symbol: "SOL",
    Image: SolanaLogo,
  },
  {
    id: 6,
    Name: "XRP",
    Symbol: "XRP",
    Image: XRPLogo,
  },
  {
    id: 7,
    Name: "Polkadot",
    Symbol: "DOT",
    Image: PolkadotLogo,
  },
  {
    id: 8,
    Name: "Dogecoin",
    Symbol: "DOGE",
    Image: DogecoinLogo,
  },
  {
    id: 9,
    Name: "Terra",
    Symbol: "LUNA",
    Image: TerraLogo,
  },
  {
    id: 10,
    Name: "Litecoin",
    Symbol: "LTC",
    Image: LitecoinLogo,
  },
  {
    id: 11,
    Name: "Avalanche",
    Symbol: "AVAX",
    Image: AvalancheLogo,
  },
  {
    id: 12,
    Name: "BitcoinCash",
    Symbol: "BCH",
    Image: BitcoinCashLogo,
  },
  {
    id: 13,
    Name: "Algorand",
    Symbol: "ALGO",
    Image: AlgorandLogo,
  },
  {
    id: 14,
    Name: "Polygon",
    Symbol: "MATIC",
    Image: PolygonLogo,
  },
  {
    id: 15,
    Name: "Stellar",
    Symbol: "XLM",
    Image: StellarLogo,
  },
  {
    id: 16,
    Name: "VeChain",
    Symbol: "VET",
    Image: VeChainLogo,
  },
  {
    id: 17,
    Name: "Internet Computer",
    Symbol: "ICP",
    Image: InternetComputerLogo,
  },
  {
    id: 18,
    Name: "Cosmos",
    Symbol: "ATOM",
    Image: CosmosLogo,
  },
  {
    id: 19,
    Name: "Filecoin",
    Symbol: "FIL",
    Image: FilecoinLogo,
  },
  {
    id: 20,
    Name: "EthereumClassic",
    Symbol: "ETC",
    Image: EthereumClassicLogo,
  },
  {
    id: 21,
    Name: "TRON",
    Symbol: "TRX",
    Image: TRONLogo,
  },
];
