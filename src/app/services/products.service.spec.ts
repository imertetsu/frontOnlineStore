import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { generateManyProducts, generateOneProduct } from '../mocks/product.mock';

fdescribe('ProductsService', () => {
  //let productsServiceSpy : jasmine.SpyObj<ProductsService>;
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
       ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("Test getProducts",()=>{
    it('should get all products', (done)=>{
      //Arrange
      const mockData: Product[] = generateManyProducts(4);
      //Act
      service.getAllProductsSimple().subscribe((data) =>{
        //Assert
        expect(data.length).toEqual(mockData.length)
        done();
      });
      //http config
      const url = environment.API_URL;
      const req = httpController.expectOne(`${url}/products`);
      req.flush(mockData);
      httpController.verify();
    });
  });
  describe("Test getAllProducts with Params",()=>{
    it('should get products sending Params',(done)=>{
      let mockData: Product[] = generateManyProducts(4);
      const limit = 10;
      const offset = 3;

      //Act
      if(offset > mockData.length){
        mockData = [];
        expect(mockData.length).toEqual(0);
      }else{
        service.getAllProducts(limit, offset).subscribe((data) =>{
          //Assert
          expect(data.length).toEqual(mockData.length);
          done();
        });
      }
      //http config
      const url = environment.API_URL;
      const req = httpController.expectOne(`${url}/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpController.verify();
    });
    it('should return products list with taxes', (done)=>{
      const mockData: Product[] = [
        {
          ... generateOneProduct(),
          price: 100,
        },
        {
          ... generateOneProduct(),
          price: 200,
        },
        {
          ... generateOneProduct(),
          price: 0,
        },
        {
          ... generateOneProduct(),
          price: -100,
        }
      ];
      service.getAllProducts().subscribe((data) =>{
        //Assert
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        done();
      });
      //http config
      const url = environment.API_URL;
      const req = httpController.expectOne(`${url}/products`);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
      /*const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProduct']);
      productsServiceSpy.getProduct.and.returnValue(product);
      service = new ProductsService(productsServiceSpy);*/

      /*expect(productsServiceSpy.getProduct(1)).toEqual({
        id: 1,
        name: "product 1",
        images: [
            "https://picsum.photos/id/237/200/300"
        ],
        description: "esta es un....",
        price: 50,
        categoryId: 2
      });
      expect(productsServiceSpy.getProduct).toHaveBeenCalled();
      expect(productsServiceSpy.getProduct).toHaveBeenCalledTimes(1);*/
