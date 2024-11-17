import { contactLogController } from "../../src/controllers/contactLog";
import { Request, Response } from "express";
import { contactLogDao } from "../../src/dao/contactLog";
import prisma from "../../src/prisma";
import * as responseHelper from "./../../src/services/responseHelper"; // Adjust the import path as needed

// Mock the dependencies
jest.mock("../../src/dao/contactLog");

jest.mock("../../src/prisma", () => ({
  // You can mock prisma methods if necessary, for example:
  // user: { findMany: jest.fn() },
}));

describe("contactLogController", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createContactLog", () => {
    it("should create a new contact log and return the result", async () => {
      const mockContactLogData = {
        message: "Test message",
        userId: 1,
        contactDate: new Date(),
      };

      const mockRequest = {
        body: mockContactLogData,
      } as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the `createContactLog` method in contactLogDao
      contactLogDao.createContactLog = jest.fn().mockResolvedValue(mockContactLogData);
      // Spy on sendSuccessResponse
      const sendSuccessSpy = jest.spyOn(responseHelper, "sendSuccessResponse").mockImplementation();

      await contactLogController.createContactLog(mockRequest, mockResponse);

      expect(contactLogDao.createContactLog).toHaveBeenCalledWith(prisma, mockContactLogData);
      expect(sendSuccessSpy).toHaveBeenCalledWith(mockResponse, 200, expect.any(String), mockContactLogData);
      sendSuccessSpy.mockRestore();
    });

    it("should return an error if creating contact log fails", async () => {
      const invalidContactLogData = {
        message: "Test message",
        userId: null, // Invalid data
        contactDate: new Date(),
      };

      const mockRequest = {
        body: invalidContactLogData,
      } as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockError = new Error("Failed to create delivery");

      // Mock the `createContactLog` to throw an error
      contactLogDao.createContactLog = jest.fn().mockRejectedValue(mockError);
      // Spy on sendErrorResponse
      const sendErrorSpy = jest.spyOn(responseHelper, "sendErrorResponse").mockImplementation();

      await contactLogController.createContactLog(mockRequest, mockResponse);

      expect(contactLogDao.createContactLog).toHaveBeenCalledWith(prisma, mockRequest.body);
      expect(sendErrorSpy).toHaveBeenCalledWith(mockResponse, 400, expect.any(String), mockError);
      sendErrorSpy.mockRestore();
    });
  });

  describe("getContactLogDetails", () => {
    it("should get contact log details for a valid ID", async () => {
      const mockContactLog = {
        id: 1,
        message: "Test message",
        userId: 1,
        contactDate: new Date(),
      };
      const mockRequest = {
        params: { id: "1" },
      } as unknown as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the `getContactLog` method in contactLogDao
      contactLogDao.getContactLog = jest.fn().mockResolvedValue(mockContactLog);

      // Spy on sendSuccessResponse
      const sendSuccessSpy = jest.spyOn(responseHelper, "sendSuccessResponse").mockImplementation();

      await contactLogController.getContactLogDetails(mockRequest, mockResponse);

      expect(contactLogDao.getContactLog).toHaveBeenCalledWith(prisma, 1);
      expect(sendSuccessSpy).toHaveBeenCalledWith(mockResponse, 200, expect.any(String), mockContactLog);
      // Restore the original implementation
      sendSuccessSpy.mockRestore();
    });

    it("should return an error if the ID is missing", async () => {
      const mockRequest = {
        params: {},
      } as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;
      const sendErrorSpy = jest.spyOn(responseHelper, "sendErrorResponse").mockImplementation();

      await contactLogController.getContactLogDetails(mockRequest, mockResponse);

      expect(sendErrorSpy).toHaveBeenCalledWith(mockResponse, 400, expect.any(String), expect.any(Error));

      sendErrorSpy.mockRestore();
    });

    it("should return an error if the contact log does not exist", async () => {
      const mockId = 1;
      const mockRequest = {
        params: { id: mockId.toString() },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockError = new Error(`Contact log not found for id: ${mockId}`);

      contactLogDao.getContactLog = jest.fn().mockRejectedValue(mockError);
      // Spy on sendErrorResponse
      const sendErrorSpy = jest.spyOn(responseHelper, "sendErrorResponse").mockImplementation();

      await contactLogController.getContactLogDetails(mockRequest, mockResponse);

      expect(contactLogDao.getContactLog).toHaveBeenCalledWith(prisma, mockId);
      expect(sendErrorSpy).toHaveBeenCalledWith(mockResponse, 400, expect.any(String), mockError);
    });
  });

  describe("updateContactLog", () => {
    it("should update the contact log and return the updated result", async () => {
      const mockUpdatedData = {
        message: "Updated message",
      };
      const mockRequest = {
        body: mockUpdatedData,
        params: { id: "1" },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const updateContactLog = {
        id: 1,
        ...mockUpdatedData,
      };
      // Mock the `updateContactLog` method in contactLogDao
      (contactLogDao.updateContactLog as jest.Mock).mockResolvedValue(updateContactLog);
      // Spy on sendSuccessResponse
      const sendSuccessSpy = jest.spyOn(responseHelper, "sendSuccessResponse").mockImplementation();

      await contactLogController.updateContactLog(mockRequest, mockResponse);

      expect(contactLogDao.updateContactLog).toHaveBeenCalledWith(prisma, 1, mockRequest.body);
      expect(sendSuccessSpy).toHaveBeenCalledWith(mockResponse, 200, expect.any(String), updateContactLog);
      // Restore spy (optional for consistency across tests)
      sendSuccessSpy.mockRestore();
    });

    it("should return an error if the update fails", async () => {
      const mockUpdatedData = {
        message: "Updated message",
      };

      const mockRequest = {
        body: mockUpdatedData,
        params: { id: "1" },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockError = new Error(expect.any(String));

      // Mock the `updateContactLog` to throw an error
      contactLogDao.updateContactLog = jest.fn().mockRejectedValue(new Error(expect.any(String)));
      // Spy on sendErrorResponse
      const sendErrorSpy = jest.spyOn(responseHelper, "sendErrorResponse").mockImplementation();

      await contactLogController.updateContactLog(mockRequest, mockResponse);

      expect(sendErrorSpy).toHaveBeenCalledWith(mockResponse, 400, expect.any(String), mockError);
      // Restore spy (optional for consistency across tests)
      sendErrorSpy.mockRestore();
    });
  });
});
