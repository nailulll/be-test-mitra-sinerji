import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Barang } from "./barang.entity";
import { Repository } from "typeorm";

@Injectable()
export class BarangService {
  constructor(
    @InjectRepository(Barang) private readonly barangRepository: Repository<Barang>,
  ) {
  }

  findAll() {
    return this.barangRepository.find();
  }
}
