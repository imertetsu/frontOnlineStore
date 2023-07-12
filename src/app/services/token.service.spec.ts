import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    service = new TokenService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Test for Token null', ()=>{
    //AAA
    it('should return a null token', ()=>{
      expect(service.getToken()).toBeNull();

    });
  });
  describe('Test for Token', ()=>{
    //AAA
    it('should return a string', ()=>{
      service.saveToken('token1');
      expect(service.getToken()).toBe('token1');
    });
  });
});
