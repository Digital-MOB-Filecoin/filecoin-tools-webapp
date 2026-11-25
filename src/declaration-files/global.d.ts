declare type CallbackFunction = (...args: any[]) => void;

declare type TSector = {
  actorId: number;
  sectorId: number;
  pieceId: number;
  state: 0 | 1 | 2;
  bytesPower: string;
  afilPledge: string;
};
