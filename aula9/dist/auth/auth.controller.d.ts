import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { Pessoa } from '../pessoa/entities/pessoa.entity';
export declare class AuthController {
    private authService;
    private pessoaRepository;
    constructor(authService: AuthService, pessoaRepository: Repository<Pessoa>);
    login(body: any): Promise<{
        access_token: string;
    }>;
}
