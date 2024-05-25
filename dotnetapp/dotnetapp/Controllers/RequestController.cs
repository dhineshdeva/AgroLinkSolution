using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {

        private readonly RequestService _requestService;
        public RequestController(RequestService requestService)
        {
            _requestService = requestService;
        }

        //getAllRequest
        [Authorize(Roles ="Seller")]
        [HttpGet("getAllRequest")]
        public async Task<ActionResult<IEnumerable<Request>>> GetAllRequest()
        {
            var request = await _requestService.GetAllRequest();
            if (request == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(request);
            }
        }
        //getRequestByRequestId
        [Authorize(Roles ="Seller,Farmer")]
        [HttpGet("getRequestByRequestId/{requestId}")]
        public async Task<ActionResult<Request>> GetRequestByRequestId(int requestId)
        {
            var request = await _requestService.GetRequestByRequestId(requestId);
            if (request == null)
                return NotFound(new { message = "Cannot Find any Request" });
            return Ok(request);
        }

        //addRequest
        [Authorize(Roles ="Farmer")]
        [HttpPost("addRequest")]
        public async Task<ActionResult> AddRequest([FromBody] Request request)
        {
            try
            {
                var sucess = await _requestService.AddRequest(request);
                if (sucess)
                {
                    return Ok(new { message = "request added sucessfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "Failed to add request" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //updateRequestByRequestId
        [Authorize(Roles = "Farmer,Seller")]
        [HttpPut("updateRequestByRequestId/{requestId}")]
        public async Task<ActionResult> UpdateRequestByRequestId(int requestId, [FromBody] Request request)
        {
            try
            {
                var sucess = await _requestService.UpdateRequestByRequestId(requestId, request);

                if (sucess)
                    return Ok(new { message = "Request updated sucessfully" });
                else
                    return StatusCode(500, new { message = "Cannot find any Request" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //deleteRequestByRequestId
        [HttpDelete("deleteRequestByRequestId/{requestId}")]
        public async Task<ActionResult> DeleteRequestByRequestId(int requestId)
        {
            try
            {
                var sucess = await _requestService.DeleteRequestByRequestId(requestId);
                if (sucess)
                    return Ok(new { message = "Request deleted sucessfully" });
                else
                    return StatusCode(500, new { message = "Cannot find any Request" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles ="Farmer")]
        [HttpGet("getRequestByUserId/{userId}")]
        //getRequestByUserId
        public async Task<ActionResult<Request>> GetRequestByUserId(int userId)
        {
            var request = await _requestService.GetRequestByUserId(userId);
            if (request == null)
                return NotFound(new { message = "Cannot Find any Request For User" });
            return Ok(request);
        }
    }
}
